export interface BookInfo {
  // 主键
  id?: number;

  // 编码
  code?: string;

  // 书名
  name?: string;

  // 国际标准书号(ISBN)
  isbn?: string;

  // 作者
  author?: string;

  // 出版社
  publisher?: string;

  // 描述
  description?: string;

  // 价格
  price?: number;

  // 出版时间
  publicationTime?: string;

  // 学科分类 ID
  bookCategoryId?: number
}
