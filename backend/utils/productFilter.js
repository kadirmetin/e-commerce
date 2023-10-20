class ProductFilter {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.keyword) {
      this.query = this.query.find({
        name: {
          $regex: this.queryString.keyword,
          $options: "i",
        },
      });
    }

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };
    const deleteKeys = ["keyword", "limit", "page"];

    deleteKeys.forEach((key) => delete queryCopy[key]);

    const filters = {};
    for (const key in queryCopy) {
      filters[key] = { $eq: queryCopy[key] };
    }

    this.query = this.query.find(filters);

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ProductFilter;
