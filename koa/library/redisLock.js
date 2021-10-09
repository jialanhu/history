const redis = require('./db.js').redis;
const util = require('./../util/utils.js');
const ApiError = require('./apiError.js');
const keyDefines = require('./../library/keyDefines.js');

/**
 * eg:
    let redisLock = new RedisLock().setResourceRedisKey(resRedisKey);
    let result = await redisLock.start();
    if (lodash.isBoolean(result)) {
        // 获得了锁
        ......
        // 释放锁
        await redisLock.destroyLock(JSON.stringify(result));
    } else {
        //获得了资源
        result = utils.safetyJsonParse(result)
    }

 eg:
     let redisLock = new RedisLock().setLockRedisKey(redisKey);
     let result = await redisLock.start();
     // 获得了锁
     ......
     // 释放锁
     await redisLock.destroyLock(JSON.stringify(result));
*/

/**
 *  redis通用资源锁
 */
class RedisLock {
	constructor () {
		this._init();
	}

	_init (){
	    this.lockTime = 3;                      // 锁的存在时间(s）
		this.tryGetLockIntervalTime = 500;      // 默认每次尝试获取锁的间隔时间(ms)
		this.count = 3;                         // 尝试次数，超过尝试次数则抛出操作超时错误
		this.resourceRedisKey = undefined;		// 资源的redisKey
		this.lockRedisKey = undefined;			// 锁的redisKey 默认为 资源的redisKey + ':LOCK'
		this.isNeedKeepLock = false;			// 是否需要持续持有锁(直到手动释放)
	}

	setCount (count) {
		if (count > 0) {
			this.count = count;
		}
		return this;
	}

	setTryGetLockIntervalTime (time) {
		if (time > 0) {
			this.tryGetLockIntervalTime = time;
		}
		return this;
	}

	setLockRedisKey (lockRedisKey) {
		this.lockRedisKey = lockRedisKey;       //锁的redisKey
		return this;
	}

	setResourceRedisKey (resourceRedisKey) {
		this.resourceRedisKey = resourceRedisKey;   //若资源在redis中有缓存备份，在尝试锁之前会先尝试获取资源
		if (!this.lockRedisKey) {		//若没有设置锁key，使用资源key + '：LOCK' 作为锁key
			this.lockRedisKey = resourceRedisKey + ':LOCK';
		}
		return this;
	}

	setNeedKeepLock (isNeedKeepLock) {
		if (typeof isNeedKeepLock === 'boolean') {
			this.isNeedKeepLock = isNeedKeepLock;
		}
	}

	async _tryGetLock () {
		return await redis.set(this.lockRedisKey, 1, "NX", "EX", this.lockTime);
	}

	async _tryGetResource () {
		if (this.resourceRedisKey) {
			return await redis.get(this.resourceRedisKey);
		}
	}

	async destroyLock (resource, ttl) {
		// 设置资源，尝试释放锁
		if (resource) {
			await redis.setex(this.resourceRedisKey, ttl || keyDefines.DEFAULT_REDIS_LOCK_TTL, resource);
		}
		await redis.del(this.lockRedisKey);
		return this;
	}

	/**
	 * 开始获取锁(并且同时尝试获取资源)
	 * 无论获取到锁，还是以获取到资源都会进行返回
	 * 当获取到锁的时候返回的是布尔型的true
	 * ！！！！！注意当返回为布尔型的true时，需要在上层处理释放锁的操作!!!!!!!!
	 * @returns {Promise<boolean|*>}
	 */
	async start () {
		while (this.count > 0) {
			let resource = await this._tryGetResource();
			if (resource) {
				return resource;
			}
			this.count --;
			let lock = await this._tryGetLock();
			if (lock) {
				return true;
			}
			await util.sleep(this.tryGetLockIntervalTime);
		}
		throw new ApiError('resource.getLockTimeOut');
	}
}

module.exports = RedisLock;
