package com.waiter.Models

data class TableOrder(
    val table: MejaModel,
    val items: List<CartItem>,
    var customerName: String = "",
    var isExpanded: Boolean = true
) {
    val totalPrice: Int
        get() = items.sumOf { it.menu.price * it.quantity }
}