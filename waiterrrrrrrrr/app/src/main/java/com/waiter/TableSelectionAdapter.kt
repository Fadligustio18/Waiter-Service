package com.waiter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.waiter.Models.MejaModel

class TableSelectionAdapter(
    private val tables: List<MejaModel>,
    private val occupiedTableIds: Set<Int>,
    private val onTableClick: (MejaModel) -> Unit
) : RecyclerView.Adapter<TableSelectionAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvTableName: TextView = view.findViewById(R.id.tvTableName)
        val tvTableStatus: TextView = view.findViewById(R.id.tvTableStatus)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_table_selection, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val table = tables[position]
        val isOccupied = occupiedTableIds.contains(table.id)
        
        holder.tvTableName.text = table.name
        
        if (isOccupied) {
            holder.tvTableName.paintFlags = holder.tvTableName.paintFlags or android.graphics.Paint.STRIKE_THRU_TEXT_FLAG
            holder.tvTableName.setTextColor(android.graphics.Color.GRAY)
            holder.tvTableStatus.visibility = View.VISIBLE
            holder.tvTableStatus.text = "Terpakai"
            holder.tvTableStatus.setTextColor(android.graphics.Color.RED)
            holder.itemView.setOnClickListener(null)
            holder.itemView.alpha = 0.6f
        } else {
            holder.tvTableName.paintFlags = holder.tvTableName.paintFlags and android.graphics.Paint.STRIKE_THRU_TEXT_FLAG.inv()
            holder.tvTableName.setTextColor(android.graphics.Color.parseColor("#2D3436"))
            holder.tvTableStatus.visibility = View.GONE
            holder.itemView.setOnClickListener { onTableClick(table) }
            holder.itemView.alpha = 1.0f
        }
    }

    override fun getItemCount() = tables.size
}