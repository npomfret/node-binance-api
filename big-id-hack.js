module.exports = {
    hackText: text => text.replace(/"orderId":\s*(\d+)/g, '"orderId": "$1"')
}