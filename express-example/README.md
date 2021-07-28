# README

## 0 目录结构
	app 应用代码目录
		controller 控制器目录 控制器的负责将用户输入调用对应的Validator进行校验，将校验后的输入调用对应的Service处理业务，得到业务结果后封装并返回
		service 服务层目录，一般是model层的操作集合或者其他业务操作
		model 模型层目录 常与持久化数据一一对应，承载数据的抽象，提供给Service进行使用
		route 路由文件目录 主要用来描述请求URL和具体承担执行动作的Controller(控制器)的对应关系
    	validation 表单检验目录 负责将用户输入进行校验，该层的使用能够使Service层不需要对输入进行校验，并且能够提前进行错误的返回
	
	config 配置文件目录,存放应用程序需要的配置、数据库配置、redis配置
		config.js 应用程序运行需要的配置文件，此文件为忽略文件
		config.example.js 配置文件示例文件，开发之前执行 cp config.example.js ./config.js操作
		db.js 存放数据库mysql、redis的配置文件
		db.example.js 存放数据库mysql、redis的配置示例文件，开发之前执行 cp db.example.js ./db.js操作
		
	job 定时任务目录
	
	library 自己开发的库或者封装的第三方库，例如：微信接口封装库，错误定义的基类
		apiError.js API错误类
		apiErrorDefines.js API错误的定义与输出code和http状态码
		db.js 数据库mysql和redis操作的封装模块
	
	logs 存放日志文件
	    request.yyyy-MM-dd.log 请求日志
		default.yyyy-MM-dd.log 默认记录日志
		exception.yyyy-MM-dd.log 异常日志
		error.yyyy-MM-dd.log 错误日志
		stats.yyyy-MM-dd.log 系统日志(错误日志、异常日志、默认日志)
	
	middleware 中间件目录
		request.js 网络请求中间件，记录请求日志，错误和异常日志，请求耗时记录
		routePermissions.js 路由权限校验中间件，进入controller操作之前对接口进行权限的校验
	
	node_modules npm安装的第三方库存放目录 此目录为忽略目录


	sql 记录对数据库表创建、修改，人工增加记录的操作，此目录不会部署到生产环境，命名规范如下：
		V001_CREATE_{tableName}.sql 创建表操作
		V005_ALTER_{tableName}_{XXXX:操作描述}.sql 修改表操作
		V010_ADD_{tableName}_{XXXX:操作描述}.sql 表添加记录操作
		V011_DELETE_{tableName}_{XXXX:操作描述}.sql 表删除记录操作
		tableName命名规范：
			资源表 t_xxx  (例如 t_user)
            配置表  t_xxx_config  (例如 t_category_config)
            记录表  t_xxx_record  (例如 t_invite_record)
            资源关系表  t_xxx_xxx   (例如 t_user_book, 对应资源为 user_books)
		
	util 工具目录
		logger.js 日志工具
			日志级别
				trace: 
				debug: 对应用程序调试使用的日志。
				info: 打印一些认为重要的信息便于查看或者统计，例如：支付回调数据。
				warn: 程序中自定义的异常信息，主要是用户触发的异常信息，相关人员每天进行收集处理。
				error:	发生错误事件，但是不影响程序运行。相关开发人员 5分钟内 应该进行跟进处理。	
				fatal: 重大错误，这种级别会使程序停止(例如:mysql/redis无法连接),应该发送告警并立即处理。
		response.js 请求输出工具		
		requestValidator.js 请求数据校验工具
	
	app.js 服务应用程序入口文件
	
	test 测试目录
	
	package.js 应用包配置文件