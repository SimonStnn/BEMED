<script lang="ts" setup>
import ApiForm from '@/components/ApiForm.vue'
import { ref } from 'vue'


// List of products (mock data for now)
const products = ref([
  {
    id: 0,
    name: 'SUP Straw',
    description: 'Single Use straw',
    price: 10,
    weight: 5,
    EF: 1.2,
    ppm: 100   // 👈 Pieces per month
  },
  {
    id: 1,
    name: 'SUP Cup',
    description: 'Single Use cup',
    price: 12,
    weight: 8,
    EF: 2.1,
    ppm: 200
    },
])

// Saves timestamps for createdAt and updatedAt
const timestamps = ref({
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

/**
 * 
 * @param product Updates the products from the API(PUT request)
 * calls when a user changes a value in the input field(blur-event)
 */

// PUT
function updateProduct(product: any){
  console.log('Product updated:', product)
fetch(`/api/products/${product.id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then(res=> res.json())
  .then(data => {
    console.log('Product updated successfully:', data)
  })
  .catch(error => {
    console.error('Error updating product:', error)
  })
  timestamps.value.updatedAt = new Date().toISOString()
}
/**
 * Adds a new product to the list of products (dosen't call the API yet)
 * This function is called when the user clicks the "Add Product" button.
 * but not before the user press the "Submit" button.
 */
// POST
function addProduct() {
  const newProduct = {
    id: Date.now(), // Unique ID for the new product(temporary id)
    name: 'New Product',
    description: 'New Description',
    price: 0,
    weight: 0,
    EF: 0,
    ppm: 0
  }
  products.value.push(newProduct)
  console.log('Product added:', newProduct)
}

/**
 * 
 * @param id Deletes a product from the list of products (dosen't call the API yet)
 */
// DELETE
function deleteProduct(id: number){
  console.log('Product deleted:', id)

  fetch(`/api/products/${id}`,{
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok) throw new Error('Delete failed')
    products.value = products.value.filter(product => product.id !== id)
    console.log('Product deleted successfully')
  })
  .catch(err => console.error('Error deleting product:', err))
  }

/**
 * * Submits all products to the API (POST request)
 * includes the timestamps for createdAt and updatedAt
 */

// POST (submit all products) requestData(temporary name for the request data)
function submitData(){
  const requestData ={
    data: products.value.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      weight: p.weight,
      EF: p.EF,
      ppm: p.ppm
    })),
    timestamps: {
      createdAt: timestamps.value.createdAt,
      updatedAt: new Date().toISOString()
    }
  }
  console.log('Submitting data:', requestData)

  fetch(`/api/assesment`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(res => res.json())
  .then(data => console.log('Data submitted successfully:', data))
  .catch(err => console.error('Error submitting data:', err))
} 

function checkFormData(){
  timestamps.value.updatedAt = new Date().toISOString()
  console.log('Submitting proucts: ',{
    data: products.value,
    timestamps: timestamps.value
  })
  
}

function onSuccess(data: any) {
  console.log('Response from server:', data)
}
</script>

<template>
  <v-card class="survey-card">
    <v-card-title class="headline">Assessment Page</v-card-title>
    <v-card-text>
      <api-form action="/assessment" method="POST" :body="{ data: products, timestamps }" @submit="checkFormData" @success="onSuccess">
        <v-simple-table class="assessment-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Weight</th>
              <th>EF</th>
              <th>PPM</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td dense hide-details style="min-width: 150px; max-width: 100%; white-space: normal; text-align: center;"><strong>{{ product.name }}</strong></td>
               <td><v-text-field v-model="product.description" @blur="updateProduct(product)" 
                dense hide-details style="min-width: 200px; max-width: 100%; white-space: normal; text-align: center;"/></td>
            <td><v-text-field v-model.number="product.price" type="number" @blur="updateProduct(product)"  
              dense hide-details style="min-width: 200px; max-width: 100%; white-space: normal; text-align: center;" /></td>
            <td><v-text-field v-model.number="product.weight" type="number" @blur="updateProduct(product)"  
              dense hide-details style="min-width: 200px; max-width: 100%; white-space: normal; text-align: center;"/></td>
            <td><v-text-field v-model.number="product.EF" type="number" @blur="updateProduct(product)"  
              dense hide-details style="min-width: 200px; max-width: 100%; white-space: normal;text-align: center;" /></td>
            <td>
                <v-text-field
                  v-model.number="product.ppm"
                  type="number"
                  placeholder="e.g. 150"
                  @blur="updateProduct(product)"
                   dense hide-details style="min-width: 200px; max-width: 100%; white-space: normal;text-align: center;"
                />
              </td>
              <td>
              <v-btn icon @click="deleteProduct(product.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            </td>
            </tr>
          </tbody>
        </v-simple-table>

        <div class="timestamps">
          <p><strong>Created at:</strong> {{ timestamps.createdAt }}</p>
          <p><strong>Updated at:</strong> {{ timestamps.updatedAt }}</p>
        </div>

        <v-btn class="sub-button" color="primary" type="submit">Submit</v-btn>
      </api-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>

.survey-card {
  width: 100%;
  padding: 20px;
  height: 100%;
  overflow: auto;
}

.headline {
  font-size: 1.5rem;
  font-weight: bold;
}

.assessment-table {
  margin-bottom: 20px;
  background-color: #f4fdfb;
}

.timestamps {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;
}

.sub-button {
  margin-top: 20px;
}
</style>
