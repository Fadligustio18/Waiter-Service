package com.waiter.Views

import android.view.LayoutInflater
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.RecyclerView
import com.waiter.Models.MejaModel
import com.waiter.Models.MenuResponse
import com.waiter.R
import com.waiter.Services.Client
import com.waiter.TableSelectionAdapter
import com.waiter.ViewModels.CartViewModel
import com.waiter.WaiterMenuAdapter
import kotlinx.coroutines.launch

class WaiterMenuFragment : Fragment(R.layout.fragment_waiter_menu) {
    private lateinit var rvMenuList: RecyclerView
    private lateinit var adapter: WaiterMenuAdapter
    private lateinit var tvSelectedTable: TextView
    private lateinit var btnSelectTable: Button
    
    private val cartViewModel: CartViewModel by activityViewModels()
    
    private var fullMenuList: List<MenuResponse> = emptyList()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        rvMenuList = view.findViewById(R.id.rvMenuList)
        tvSelectedTable = view.findViewById(R.id.tvSelectedTable)
        btnSelectTable = view.findViewById(R.id.btnSelectTable)
        
        adapter = WaiterMenuAdapter(emptyList()) { menu ->
            if (cartViewModel.selectedTable.value == null) {
                Toast.makeText(requireContext(), "Pilih meja terlebih dahulu!", Toast.LENGTH_SHORT).show()
            } else {
                cartViewModel.addToCart(menu)
                Toast.makeText(requireContext(), "${menu.name} ditambahkan ke keranjang", Toast.LENGTH_SHORT).show()
            }
        }
        rvMenuList.adapter = adapter

        cartViewModel.selectedTable.observe(viewLifecycleOwner) { table ->
            tvSelectedTable.text = if (table != null) "Meja: ${table.name}" else "Pilih Meja"
        }

        btnSelectTable.setOnClickListener {
            showTableSelectionDialog()
        }

        loadMenu()
    }

    private fun showTableSelectionDialog() {
        viewLifecycleOwner.lifecycleScope.launch {
            try {
                // 1. Ambil data semua meja
                val mejaResponse = Client.meja.getMeja()
                // 2. Ambil data orderan yang sedang aktif (misal status 1, 2, 3)
                // Kita anggap meja yang ada di list getAllOrders dengan status < 4 (belum dibayar) adalah meja yang terpakai
                val orderResponse = Client.order.getAllOrders()

                if (mejaResponse.isSuccessful && orderResponse.isSuccessful) {
                    val tables = mejaResponse.body() ?: emptyList()
                    val activeOrders = orderResponse.body() ?: emptyList()
                    
                    // Filter meja yang sedang digunakan (status order 1, 2, 3, atau 4)
                    // Status 5 adalah 'Selesai/Dibayar', jadi semua status < 5 dianggap meja masih terpakai.
                    val occupiedTableIds = activeOrders
                        .filter { it.statusId < 5 }
                        .map { it.locationId }
                        .toSet()

                    val dialogView = LayoutInflater.from(requireContext()).inflate(R.layout.dialog_select_table, null)
                    val rvTableList = dialogView.findViewById<androidx.recyclerview.widget.RecyclerView>(R.id.rvTableList)
                    
                    val dialog = AlertDialog.Builder(requireContext(), R.style.CustomDialogTheme)
                        .setView(dialogView)
                        .create()

                    rvTableList.adapter = TableSelectionAdapter(tables, occupiedTableIds) { selectedTable ->
                        dialog.dismiss()
                        showCustomerNameDialog(selectedTable)
                    }

                    dialog.show()
                    dialog.window?.setBackgroundDrawableResource(android.R.color.transparent)
                } else {
                    Toast.makeText(requireContext(), "Gagal mengambil data meja atau orderan", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Toast.makeText(requireContext(), "Error: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun showCustomerNameDialog(selectedTable: MejaModel) {
        val dialogView = LayoutInflater.from(requireContext()).inflate(R.layout.dialog_customer_name, null)
        val tvMessage = dialogView.findViewById<TextView>(R.id.tvDialogMessage)
        val etName = dialogView.findViewById<com.google.android.material.textfield.TextInputEditText>(R.id.etCustomerName)
        val btnSave = dialogView.findViewById<com.google.android.material.button.MaterialButton>(R.id.btnSave)
        val btnCancel = dialogView.findViewById<com.google.android.material.button.MaterialButton>(R.id.btnCancel)
        
        tvMessage.text = "Masukkan nama customer untuk meja ${selectedTable.name}"

        val dialog = AlertDialog.Builder(requireContext(), R.style.CustomDialogTheme)
            .setView(dialogView)
            .create()

        dialog.show()
        dialog.window?.setBackgroundDrawableResource(android.R.color.transparent)

        btnCancel.setOnClickListener {
            dialog.dismiss()
        }

        btnSave.setOnClickListener {
            val customerName = etName.text.toString().trim()
            if (customerName.isEmpty()) {
                etName.error = "Nama customer wajib diisi"
            } else {
                cartViewModel.setSelectedTable(selectedTable)
                cartViewModel.setCustomerName(customerName)
                tvSelectedTable.text = "Meja: ${selectedTable.name}"
                Toast.makeText(requireContext(), "Meja ${selectedTable.name} untuk $customerName", Toast.LENGTH_SHORT).show()
                dialog.dismiss()
            }
        }
    }

    private fun loadMenu() {
        viewLifecycleOwner.lifecycleScope.launch {
            try {
                val response = Client.menu.getMenu()
                if (response.isSuccessful) {
                    fullMenuList = response.body() ?: emptyList()
                    adapter.updateData(fullMenuList)
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}