/**
 * 点类
 *
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * 尺寸类
 *
 */
function Size(width, height) {
    this.width  = width;
    this.height = height;
}


/**
 * 图形类
 * 用于绘制常用图形
 */
function Shape(canvas) {
    this.ctx           = document.getElementById(canvas).getContext('2d');
    this.size          = null;
    this.point         = null;
    this.color         = '#ffffff';
    this.radius        = 0;
    this.startAngle    = 0;
    this.endAngle      = 0;
    this.anticlockwise = false;
    this.isStroke      = false;
}

/**
 * 设置上下文
 */
Shape.prototype.setCtx = function(ctx) {
    this.ctx = ctx;
    return this;
}

/**
 * 获取上下文
 */
Shape.prototype.getCtx = function() {
    return this.ctx;
}

/**
 * 设置尺寸
 */
Shape.prototype.setSize = function(w, h) {
    this.size = new Size(w, h);
    return this;
};

/**
 * 获取尺寸
 */
Shape.prototype.getSize = function() {
    return this.size;
}

/**
 * 设置点
 */
Shape.prototype.setPoint = function(x, y) {
    this.point = new Point(x, y);
    return this;
}

/**
 * 获取点
 */
Shape.prototype.getPoint = function() {
    return this.point;
}

/**
 * 设置颜色
 */
Shape.prototype.setColor = function(color) {
    this.color = color;
    return this;
}

/**
 * 获取颜色
 */
Shape.prototype.getColor = function() {
    return this.color;
}

/**
 * 使用边框
 */
Shape.prototype.usingStroke = function() {
    this.isStroke = true;
    return this;
}

/**
 * 设置半径
 */
Shape.prototype.setRadius = function(radius) {
    this.radius = radius;
    return this;
}

/**
 * 获取半径
 */
Shape.prototype.getRadius = function() {
    return this.radius;
}

/**
 * 设置起始角度
 */
Shape.prototype.setStartAngle = function(startAngle) {
    this.startAngle = (Math.PI / 180) * startAngle;
    return this;
}

/**
 * 获取起始角度
 */
Shape.prototype.getStartAngle = function() {
    return this.startAngle;
}

/**
 * 设置截止角度
 */
Shape.prototype.setEndAngle = function(endAngle) {
    this.endAngle = (Math.PI / 180) * endAngle;
    return this;
}

/**
 * 获取截止角度
 */
Shape.prototype.getEndAngle = function() {
    return this.endAngle;
}

/**
 * 是否逆时针旋转
 */
Shape.prototype.usingAntiClockwise = function() {
    this.anticlockwise = true;
    return this;
}

/**
 * 绘制矩形
 */
Shape.prototype.drawRectangular = function() {
    if (this.isStroke) {
        this.ctx.strokeStyle = this.color;
    } else {
        this.ctx.fillStyle = this.color;
    }
    this.ctx.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
}

/**
 * 清除矩形区域
 */
Shape.prototype.clearRectangular = function() {
    this.ctx.clearRect(this.point.x, this.point.y, this.size.width, this.size.height);
}

/**
 * 画圆
 */
Shape.prototype.drawCircle = function() {
    this.ctx.beginPath();
    this.ctx.arc(this.point.x, this.point.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
    if (this.isStroke) {
        this.ctx.strokeStyle = this.color;
        this.ctx.closePath();
        this.ctx.stroke();
    } else {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

/**
 * 绘制树状图
 */
Shape.prototype.drawDendrogram = function(options) {
    //变量赋值
    var legendTitle = options.legendTitle;
    var originX     = options.originX;
    var originY     = options.originY;
    var width       = options.width;
    var height      = options.height;
    var lineWidth   = options.lineWidth;
    var offsetX     = options.offsetX;
    var values      = options.values;

    //绘制X,Y轴
    this.ctx.beginPath();
    this.ctx.moveTo(originX, originY);
    this.ctx.lineTo(originX + width, originY);
    this.ctx.moveTo(originX, originY);
    this.ctx.lineTo(originX, originY - height);
    this.ctx.stroke();
    this.ctx.closePath();

    //绘制legend
    this.ctx.font = '10px Hiragino Sans GB,Arial,Helvetica,"宋体",sans-serif';
    this.ctx.fillText(legendTitle, originX + width, originY - height);

    //绘制树状图
    this.ctx.beginPath();
    for(var i = 0, len = values.length; i < len; i++) {
        this.ctx.moveTo(originX + (i + 1) * offsetX, originY);
        this.ctx.lineTo(originX + (i + 1) * offsetX, originY - values[i]);
        this.ctx.lineWidth = lineWidth || 1;
        this.ctx.stroke();
    }
    this.ctx.closePath();
}

module.exports = Shape;
