class Base {
	async insert (insertObj) {
		return await this.mysql(this._TABLE).insert(insertObj);
	}

	async del (whereOptions) {
		return await this.mysql(this._TABLE).where(whereOptions).del();
	}

	async update (updateField, whereOptions) {
		return await this.mysql.from(this._TABLE).update(updateField).where(whereOptions);
	}

	async findOne (fields, whereOptions) {
		return await this.mysql.select(fields).from(this._TABLE).where(whereOptions).first();
	}
}

module.exports = Base;