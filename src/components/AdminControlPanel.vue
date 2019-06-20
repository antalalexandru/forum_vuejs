<template>
    <div>
        <center><h3 style="padding: 30px 0; font-family: 'Raleway'; font-weight: 200; font-size: 40px;">Admin Control Panel</h3></center>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Categories</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Users</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                <span v-on:click="goBack" v-if="this.currentParentCategory !== 0" class="badge badge-secondary" style="margin:20px 0 0 0; cursor: pointer"><i class="fas fa-angle-left"></i>&nbsp; Back to {{this.previousCategoryHistory[this.previousCategoryHistory.length - 1].name}}</span>


                <div class="row" style="margin: 20px 0;">
                    <div class="col-lg-6 col-md-6"><h3>{{this.currentParentCategoryName}}</h3></div>
                    <div class="col-lg-6 col-md-6" style="text-align: right"><button data-toggle="modal" data-target=".add-new-category-modal" type="button" class="btn btn-light"><i class="fas fa-folder-plus"></i> Add category</button></div>

                </div>

                <div class="modal fade add-new-category-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add new category</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Category title</label>
                                        <input type="text" class="form-control" id="recipient-name" v-model="newCategoryInput.name">
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Description</label>
                                        <textarea class="form-control" id="message-text" v-model="newCategoryInput.description"></textarea>
                                    </div>

                                    <div class="form-group">
                                        <label>Parent category: {{this.currentParentCategoryName}}</label>
                                    </div>

                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="newCategoryInput.allowPosting">
                                        <label class="form-check-label" for="exampleCheck1">Allow posting in this category</label>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="handleAddNewCategory">Add category</button>
                            </div>
                        </div>
                    </div>
                </div>

                <draggable class="list-group" v-model="categories" @change="log">
                        <div v-for="category in categories" :key="category.id" class="list-group-item">
                            <div style="float: right">
                                <i v-on:click="setCategoryToEdit(category)" data-toggle="modal" data-target=".edit-category-modal" title="Edit this category" class="fas fa-edit" style="color: #3d6594; margin: 4px 5px 0 0; cursor: pointer"></i>
                                &nbsp;
                                <i v-on:click="handleDeleteCategory(category)" data-toggle="modal" data-target=".delete-category-modal" title="Remove this category" class="fas fa-times-circle" style="color: #cc0000; margin: 4px 0 0 0; cursor: pointer"></i>
                            </div>
                            <i class="fas fa-angle-right"></i> &nbsp;<span v-on:click="changeCategory(category.id)" style="cursor: pointer">{{category.name}}</span>
                        </div>
                </draggable>

                <div class="modal fade delete-category-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Delete category {{this.categoryToDelete.name}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-danger" role="alert" v-if="this.categoryToDeleteHasChildCategories">
                                    Cannot delete this category since it has at least one child category
                                </div>
                                <div class="alert alert-warning" role="alert" v-else>
                                    <p><b>Deletion of this category will lead to removal of all topics and posts inside this category.</b></p>
                                    <p>Do you want to continue?</p>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="__deleteCategory" v-if=" ! this.categoryToDeleteHasChildCategories">Delete category</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade edit-category-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit category {{categoryToEdit.name}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Category title</label>
                                        <input type="text" class="form-control" id="recipient-name" v-model="categoryToEdit.name">
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Description</label>
                                        <textarea class="form-control" id="message-text" v-model="categoryToEdit.description"></textarea>
                                    </div>

                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="categoryToEdit.allowPosting">
                                        <label class="form-check-label" for="exampleCheck1">Allow posting in this category</label>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="handleUpdateCategory">Update category</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                <Pagination
                        :current_page="currentUsersPage"
                        :total_pages="totalUsersPages"
                        :changePage="changePage"
                />

                <div style="text-align: center">
                    <loading :active.sync="loadingUsersPage"
                             :can-cancel="false"
                             :is-full-page="true"
                             style="margin: 20px;"
                    ></loading>
                </div>

                <table class="table">
                    <tbody>

                    <tr v-for="user in usersList" v-bind:key="user.id">
                        <td style="width: 50px; height: 50px; text-align: center">
                            <div :style="getAvatarStyle(user)"></div>
                        </td>
                        <td style="vertical-align: middle">{{user.username}}</td>
                        <td style="vertical-align: middle">{{user.email}}</td>
                        <td style="vertical-align: middle">

                            <!-- <div v-html="getUserGroupFormatted(user.group)" style="display: inline"></div> -->

                            <select class="form-control" v-model="selectedGroup[user.id]" v-on:change="handleUpdateUserGroup(user.id)">
                                <option v-for="group in groupList" v-bind:key="group.id" v-bind:value=group.id>{{group.name}}</option>
                            </select>

                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import {
        addNewCategory,
        getCategoriesByParent,
        updateCategory,
        getGroups,
        getUsers,
        updateCategoriesRank,
        updateUserGroup,
        deleteCategory
    } from "@/service/api";
    import Pagination from "@/components/Pagination";
    import {getUserGroupFormatted} from "@/service/utils";


    export default {
        name: "AdminControlPanel",
        components: {
            draggable,
            Pagination
        },
        data() {
            return {
                categories: [],

                currentParentCategory: 0,
                currentParentCategoryName: '',

                previousCategoryHistory: [{
                    id: 0,
                    name: 'Root'
                }],

                newCategoryInput: {
                    name: '',
                    description: '',
                    allowPosting: true
                },

                categoryToEdit: {},
                categoryToDelete: {},
                categoryToDeleteHasChildCategories: false,

                categoriesHierarchy: [],

                currentUsersPage: 1,
                totalUsersPages: 1,
                loadingUsersPage: true,

                usersList: [],
                groupList: [],
                selectedGroup: {}
            };
        },
        methods: {
            onUpdate: function (event) {
                this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0])
            },

            log: function () {

                let loadingToaster = this.$toasted.show("Saving categories order ...", {
                    theme: "toasted-primary",
                    position: "top-center",
                    duration : 1000,
                    type: 'info',
                    iconPack: 'fontawesome',
                    icon: 'info'
                });

                for(let i = 0; i < this.categories.length; i++) {
                    this.categories[i].rank = i + 1;
                }
                updateCategoriesRank(this.categories,
                    (response, err) => {
                        if(err == null) {
                            loadingToaster.goAway(0);
                            this.$toasted.show("Categories order updated", {
                                theme: "toasted-primary",
                                position: "top-center",
                                duration : 1000,
                                type: 'success',
                                iconPack: 'fontawesome',
                                icon: 'check'
                            });
                        }
                    });
            },

            changeCategory: function(id) {

                this.previousCategoryHistory.push({
                    id: this.currentParentCategory,
                    name: this.currentParentCategoryName
                });

                this.currentParentCategory = id;
                this.loadCategories();
            },

            loadCategories: function() {
                getCategoriesByParent({
                    category_id: this.currentParentCategory
                }, (response, err) => {
                    if (err == null) {
                        this.categories = this.currentParentCategory === 0 ? response : response.childCategories;

                        if(this.currentParentCategory !== 0) {
                            this.currentParentCategoryName = response.name;
                        } else {
                            this.currentParentCategoryName = 'Root categories'
                        }
                    }
                });
            },

            goBack: function() {

                let previous = this.previousCategoryHistory.pop();
                this.currentParentCategory = previous.id;
                this.loadCategories();
            },

            handleAddNewCategory: function() {
                addNewCategory({
                    name: this.newCategoryInput.name,
                    description: this.newCategoryInput.description,
                    allowPosting: this.newCategoryInput.allowPosting,
                    parentCategory: this.currentParentCategory
                }, (response, err) => {
                    if(err == null) {
                        this.loadCategories();
                    }
                });
            },

            handleUpdateCategory: function() {
                let updatingCategoryToaster = this.$toasted.show("Updating category ...", {
                    theme: "toasted-primary",
                    position: "top-center",
                    duration : 1000,
                    type: 'info',
                    iconPack: 'fontawesome',
                    icon: 'info'
                });
                updateCategory({
                    id: this.categoryToEdit.id,
                    name: this.categoryToEdit.name,
                    description: this.categoryToEdit.description,
                    allowPosting: this.categoryToEdit.allowPosting,
                }, (response, err) => {
                    updatingCategoryToaster.goAway(0);
                    if(err == null) {
                        this.$toasted.show("Category updated succesfully", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 1000,
                            type: 'success',
                            iconPack: 'fontawesome',
                            icon: 'check'
                        });
                        this.loadCategories();
                    } else {
                        this.$toasted.show("Error updating category", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 2000,
                            type: 'error',
                            iconPack: 'fontawesome',
                            icon: 'info'
                        });
                    }
                });
            },

            loadUsers: function() {
                this.loadingUsersPage = true;
                getUsers({
                    page: this.currentUsersPage
                }, (response, error) => {
                    this.loadingUsersPage = false;
                    if(error == null) {
                        this.usersList = response.elements;
                        this.totalUsersPages = response.totalPages;

                        for(let user of this.usersList) {
                            this.selectedGroup[user.id] = user.group.id;
                        }

                    }
                });
            },

            getUserGroupFormatted: getUserGroupFormatted,

            getAvatarStyle: function(user) {
                if(user == null || user.avatar == null || user.avatar.trim() === '') {
                    return "border-radius: 2px; max-width: 90px;max-height: 50px;min-height: 40px;min-width: 45px;background: url('https://forum.softpedia.com//public/style_images/carbon_blue/profile/default_large.png') no-repeat;background-size:cover;background-position: center;";
                } else {
                    return "border-radius: 2px; max-width: 90px;max-height: 50px;min-height: 45px;min-width: 45px;background: url('" + user.avatar + "') no-repeat;background-size:cover;background-position: center;";
                }
            },

            changePage: function(pageNumber) {
                this.currentUsersPage = pageNumber;
                this.loadUsers();
            },

            setCategoryToEdit: function(category) {
                this.categoryToEdit = category;
            },

            handleUpdateUserGroup: function(userId) {

                let updatingUserToaster = this.$toasted.show("Updating user ...", {
                    theme: "toasted-primary",
                    position: "top-center",
                    duration : 1000,
                    type: 'info',
                    iconPack: 'fontawesome',
                    icon: 'info'
                });

                updateUserGroup({
                    group_id: this.selectedGroup[userId],
                    user_id: userId
                }, (response, error) => {
                    updatingUserToaster.goAway(0);
                    if(error == null) {
                        this.$toasted.show("User succesfully updated", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 1000,
                            type: 'success',
                            iconPack: 'fontawesome',
                            icon: 'check'
                        });
                    } else {
                        this.$toasted.show("Error updating user", {
                            theme: "toasted-primary",
                            position: "top-center",
                            duration : 2000,
                            type: 'error',
                            iconPack: 'fontawesome',
                            icon: 'info'
                        });
                    }
                });
            },

            __deleteCategory: function() {
                deleteCategory({
                    category_id: this.categoryToDelete.id
                }, (response, err) => {
                    if(err == null) {
                        this.loadCategories();
                    }
                });
            },

            handleDeleteCategory: function(category) {

                this.categoryToDelete = category;

                this.categoryToDeleteHasChildCategories = category.childCategories.length > 0;

                return;

                if(category.childCategories.length > 0) {
                    this.$toasted.show("Cannot remove category since it has at least one child category", {
                        theme: "toasted-primary",
                        position: "top-center",
                        duration : 3000,
                        type: 'error',
                        iconPack: 'fontawesome',
                        icon: 'info'
                    });
                } else {
                    this.$dialog
                        .confirm('Deletion of this category will lead to removal of all topics and posts inside this category. Do you want to continue?', {
                            html: true,
                            loader: true,
                            okText: 'Delete category',
                            cancelText: 'Cancel',
                        })
                        .then(function(dialog) {
                            console.log('Clicked on proceed');
                        })
                        .catch(function() {
                            console.log('Clicked on cancel');
                        });
                }
            }

        },

        created() {
            this.loadCategories();
            this.loadUsers();

            getGroups((response, err) => {
                if(err == null) {
                    this.groupList = response;
                }
            });
        }
    }
</script>

<style scoped>
    .dg-btn--ok {
        border-color: green;
    }

    .dg-btn-loader .dg-circle {
        background-color: green;
    }
</style>
