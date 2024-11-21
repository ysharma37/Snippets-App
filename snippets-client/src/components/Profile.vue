<template>
    <div class="profile-wrapper">
      <div class="profile">
        <div class="left-column">
          <img class="profile-pic" v-bind:src="pic" alt="profile pic" />
        </div>
        <div class="right-column">
          <p>
            <i class="far fa-user"></i>
            {{ user.username }}
          </p>
          <p>
            <i class="far fa-envelope"></i>
            {{ user.years_experience }}
          </p>
          <p>
            <i class="fas fa-graduation-cap"></i>
            {{ user.email }}
          </p>
        </div>
      </div>
      <div class="specialties">
        <h3>Snippets</h3>
        <ul>
          <li v-for="snippets in this.user.snippets" :key="snippets">
            {{ snippets.title }} - {{ snippets.programming_language }}
          </li>
        </ul>
        <h3>Bookmarks</h3>
        <ul>
          <li v-for="bookmark in this.user.bookmarks" :key="bookmarks">
            {{ bookmark._id }} 
          </li>
        </ul>
        <button @click="addSnippets">Add Snippets</button>
      </div>
      <!-- Add more sections for additional information as needed -->
    </div>
  </template>
  
  <script>

  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {},
        pic: "",
      };
    },
    async created() {
      const { id } = this.$route.params;
  
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${id}?snippets=true&bookmarks=true`
        );
  
        this.user = response.data;
        // Replace the following line with your logic to generate profile picture URL
        this.pic = `https://api.dicebear.com/7.x/initials/svg?seed=${this.user.username}&backgroundColor=27b8c7`;
        console.log(this.user)
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async addSnippets() {
        const token = localStorage.getItem('authToken');
        console.log(token);
      }
    }
  };
  </script>
  
  <style scoped>
  .profile {
      display: flex;
      margin: 0 auto;
      padding: 20px;
  }
  
  .profile p {
      color: #f8f8ff;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
  }
  
  .profile i {
      color: #27b8c7;
      margin-right: 10px;
  }
  
  .profile-pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 20px;
  }
  
  .left-column {
      flex: 1;
      display: flex;
      justify-content: center;
  }
  
  .right-column {
      flex: 1;
      display: flex;
      justify-content: left;
      flex-direction: column;
  }
  
  .specialties {
      color: #f8f8ff;
      background-color: #565263;
      text-align: left;
      padding: 15px;
      width: 100%;
  }
  
  .loop ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
  }
  
  .loop ul li {
      color: #f8f8ff;
      border: 1px solid #d7a8c3;
      border-radius: 2px;
      display: inline-block;
      font-size: 12px;
      margin: 0 7px 7px 0;
      padding: 7px;
      text-transform: uppercase;
  }
  
  .quizzes {
      color: #f8f8ff;
      background-color: #73677c;
      text-align: left;
      padding: 15px;
      width: 100%;
  }
  </style>
  
  