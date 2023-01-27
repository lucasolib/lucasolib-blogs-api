const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    },
  );

    PostCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'blogPostId',
        otherKey: 'categoryId',
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'blogPosts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'blogPostId',
      });
    };

  return PostCategory;
};

module.exports = PostCategoryModel;