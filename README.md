# structcontent
structcontent 结构内容


## 依赖
1. 依赖JQuery v2.1.4。较低版本应该也支持，具体没测试。
2. 依赖BootStrap3.0


## CSS说明
class 中自定义的值 用下划线连接
struct-cell 一个结构单元。目前包含 text 、 textarea 、 img 后续包括 视频等

## v1.0.1 beta1
1. 高级结构单元中的 文本域和图片 个数大于2 可以删除
2. 样式优化

## v1.0 release
1. 增加 高级结构单元(包含 标题、文本域和图片)
2. 增加 简单结构单元(包含 文本域和图片)
3. 结构单元删除
4. 结构单元移动
5. H5图片上传功能
6. 生成JSON功能
7. 动态展示生成JSON功能
8. 页面初始化数据展示

## v1.0 beta1
1. ~~第一个和最后一个单元的优化~~
2. ~~上传图片~~
3. ~~结构内容转成JSON格式~~
4. ~~结构调整~~
5. ~~template 模板~~
6. ~~初始化数据~~
7. ~~保存按钮~~ 
 

## 后续想要优化
1. JQuery插件形势
2. 高版本浏览器缓存
3. 定制模板
4. 拖拽实现上移和下移

## 模板类别
1. 模板一：文本域+图片
2. 模板二：标题+[{文本域+图片},...]
3. 模板三：

## 结构内容定位
1. 简单，不包含二维以上情况。

## 安装NodeJS和预编译
1. 依赖软件：yum -y install gcc make gcc-c++ openssl-devel wget
2. 下载源码：wget https://nodejs.org/dist/v0.12.7/node-v0.12.7.tar.gz （注意下载源码地址）
3. 安装到指定目录： ./configure --prefix=/usr/local/
4. 安装：make && make install
5. 检测：node -v 显示：v0.12.7
6. 安装NodeJS ：npm install -g tmodjs


