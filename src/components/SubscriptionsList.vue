<template>
    <div class="app">
        <Navbar />
        <h3 class="text-center" style="padding-top:20px">Subscriptions List</h3>
        <div class="row row-cols-1 row-cols-md-2 g-4" style="margin:1%">
            <div class="col" v-for="subscription in Subscriptions" :key="subscription.key" style="padding-top: 5px">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Subscription Name: {{ subscription.name }}</h5>
                        <p class="card-text">Subscription Description: {{ subscription.description }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Price: {{ subscription.amount }}</li>
                        <li class="list-group-item">Payment Interval: {{ subscription.frequency }}</li>
                    </ul>
                    <div class="card-body">
                        <h5 class="card-title">Actions:</h5>
                        <router-link :to="{ name: 'edit', params: { id: subscription.key } }"
                            class="btn btn-primary btn-sm px-3">
                            Edit
                        </router-link>
                        <button @click.prevent="deleteSubscription(subscription.key)" class="btn btn-danger btn-sm px-3">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        <button class="btn btn-success" @click="createSubscription">Add New Subscription</button>
        <div class="List">
            <div class="row justify-content-center">
                <div class="col-md-12" style="padding: 5%">
                    <h3 class="text-center">Subscriptions List</h3>

                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th class="h6"><strong>Subscription</strong></th>
                                <th class="h6"><strong>Description</strong></th>
                                <th class="h6"><strong>Amount</strong></th>
                                <th class="h6"><strong>Frequency</strong></th>
                                <th class="h6"><strong>Actions</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="subscription in Subscriptions" :key="subscription.key">
                                <td>{{ subscription.name }}</td>
                                <td class="d-none d-sm-table-cell">{{ subscription.description }}</td>
                                <td>${{ subscription.amount }}</td>
                                <td>{{ subscription.frequency }}</td>
                                <td>
                                    <router-link :to="{ name: 'edit', params: { id: subscription.key } }"
                                        class="btn btn-primary btn-sm px-3">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deleteSubscription(subscription.key)"
                                        class="btn btn-danger btn-sm px-3">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-success" @click="createSubscription">Add New Subscription</button>

                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import db from '../firebaseDb'
import Navbar from './Navbar.vue'

export default {
    name: "List-vue",
    components: {
        Navbar
    },
    data() {
        return {
            Subscriptions: [],
        }
    },
    created() {
        db.collection('subscriptions').onSnapshot((snapshotChange) => {
            this.Subscriptions = []
            snapshotChange.forEach((doc) => {
                if (doc.data().name) {
                    this.Subscriptions.push({
                        key: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        amount: doc.data().amount,
                        frequency: doc.data().frequency
                    })
                }
            })
        })
    },
    methods: {
        deleteSubscription(id) {
            if (window.confirm('Do you really want to delete?')) {
                db.collection('subscriptions').doc(id).delete().then(() => {
                })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },
        createSubscription() {
            this.$router.push('/create')
        }
    }
}
</script>
<style lang="scss">
.table thead {
    background-color: #42B883;
    color: #2C3D4E;
}

.table td,
.table th {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

.table tr:nth-child(even) {
    background-color: Lightgreen;
}

.btn {
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 5px;
    padding-left: 5px;
    margin: 2px;
}
</style>
    