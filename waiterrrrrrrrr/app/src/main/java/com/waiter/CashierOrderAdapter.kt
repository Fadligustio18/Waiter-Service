package com.waiter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.ncorti.slidetoact.SlideToActView
import com.waiter.Models.OrderListItem
import com.waiter.Models.OrderItemDetail
import com.waiter.Controllers.OrderControllers
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

import java.util.*

class CashierOrderAdapter(
    private var orders: List<OrderListItem>,
    private val orderControllers: OrderControllers,
    private val scope: CoroutineScope,
    private val onPaymentDone: () -> Unit
) : RecyclerView.Adapter<CashierOrderAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvTableName: TextView = view.findViewById(R.id.tvTableName)
        val tvTotalItems: TextView = view.findViewById(R.id.tvTotalItems)
        val tvTotalPrice: TextView = view.findViewById(R.id.tvTotalPrice)
        val rvOrderItems: RecyclerView = view.findViewById(R.id.rvOrderItems)
        val btnDone: SlideToActView = view.findViewById(R.id.btnDone)
        val btnDrop: ImageView = view.findViewById(R.id.btnDrop)
        val layoutCashierHeader: View = view.findViewById(R.id.layoutCashierHeader)
        val layoutExpandedCashier: View = view.findViewById(R.id.layoutExpandedCashier)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_status_cashier, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val order = orders[position]
        // Menggunakan locationName sesuai model terbaru
        holder.tvTableName.text = order.locationName
        
        holder.layoutExpandedCashier.visibility = View.GONE

        val toggleDropdown = View.OnClickListener {
            val isExpanded = holder.layoutExpandedCashier.visibility == View.VISIBLE
            if (!isExpanded) {
                holder.layoutExpandedCashier.visibility = View.VISIBLE
                holder.btnDrop.animate().rotation(180f).setDuration(300).start()
                // Pindahkan loadOrderDetails ke sini agar hanya diload saat dibuka
                loadOrderDetails(holder, order.id)
            } else {
                holder.layoutExpandedCashier.visibility = View.GONE
                holder.btnDrop.animate().rotation(0f).setDuration(300).start()
            }
        }

        holder.layoutCashierHeader.setOnClickListener(toggleDropdown)
        holder.btnDrop.setOnClickListener(toggleDropdown)

        // Reset status slide agar tidak macet di posisi selesai saat di-bind ulang
        holder.btnDone.setCompleted(false, false)
        holder.btnDone.onSlideCompleteListener = object : SlideToActView.OnSlideCompleteListener {
            override fun onSlideComplete(view: SlideToActView) {
                val currentPosition = holder.bindingAdapterPosition
                if (currentPosition != RecyclerView.NO_POSITION) {
                    processPayment(holder.itemView.context, order.id)
                }
            }
        }
    }

    private fun processPayment(context: android.content.Context, orderId: Int) {
        scope.launch {
            try {

                val response = orderControllers.updateOrderStatus(orderId, 5)
                if (response.isSuccessful) {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(context, "Pembayaran Berhasil. Pesanan selesai.", Toast.LENGTH_SHORT).show()
                        onPaymentDone() // Merefresh list di CashierActivity
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(context, "Gagal update: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun loadOrderDetails(holder: ViewHolder, orderId: Int) {
        scope.launch {
            try {
                val response = orderControllers.getOrderDetailById(orderId)
                if (response.isSuccessful) {
                    val items: List<OrderItemDetail> = response.body()?.items ?: emptyList()
                    val totalItem = items.sumOf { it.quantity }
                    val totalPrice = items.sumOf { it.priceAtOrder * it.quantity }

                    withContext(Dispatchers.Main) {
                        holder.tvTotalItems.text = "Total Item: $totalItem"
                        holder.tvTotalPrice.text = formatRupiah(totalPrice)
                        
                        holder.rvOrderItems.layoutManager = LinearLayoutManager(holder.itemView.context)
                        holder.rvOrderItems.adapter = CashierOrderItemAdapter(items)
                    }
                }
            } catch (e: Exception) { }
        }
    }

    override fun getItemCount() = orders.size

    fun updateData(newOrders: List<OrderListItem>) {
        orders = newOrders
        notifyDataSetChanged()
    }

    private fun formatRupiah(number: Int): String {
        val localeID = Locale("in", "ID")
        val formatRupiah = java.text.NumberFormat.getCurrencyInstance(localeID)
        return formatRupiah.format(number.toDouble()).replace("Rp", "Rp ")
    }
}

class CashierOrderItemAdapter(private val items: List<OrderItemDetail>) : 
    RecyclerView.Adapter<CashierOrderItemAdapter.ViewHolder>() {
    
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val text = view.findViewById<TextView>(android.R.id.text1)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(android.R.layout.simple_list_item_1, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]
        holder.text.text = "${item.menuName} (${item.quantity}x) - Rp ${item.priceAtOrder * item.quantity}"
    }

    override fun getItemCount() = items.size
}
