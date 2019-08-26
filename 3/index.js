const registrationVM = new Vue({
  el: '#registration',
  data: {
    username: '',
    email: '',
    password: '',
    jwt: ''
  },
  methods: {
    handleSubmit: function(e) {
      e.preventDefault();
      if (!this.$data.username) alert('Username is neccesery');
      else {
        fetch('http://eddiecooro.com/auth/local/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.$data.username,
            email: this.$data.email,
            password: this.$data.password
          })
        })
          .then(res => res.json())
          .then(json => (this.$data.jwt = json.jwt));
      }
    }
  }
});

const vm = new Vue({
  el: '#main',
  data: {
    className: 'item',
    todos: [],
    number: 3,
    showBox: false
  },
  methods: {
    handleClick: () => {
      console.log('Clicked');
    },
    handleMessage: function(message) {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'delete': {
          this.handleDelete(data.data);
          break;
        }
        case 'update': {
          this.handleUpdate(data.data);
          break;
        }
        case 'create': {
          this.handleCreate(data.data);
          break;
        }
      }
      console.log(data);
    },
    handleDelete: function(todo) {
      this.$data.todos = this.$data.todos.filter(t => t.id !== todo.id);
    },
    handleUpdate: function(todo) {
      this.$data.todos = this.$data.todos.map(t =>
        t.id === todo.id ? todo : t
      );
    },
    handleCreate: function(todo) {
      this.$data.todos.push(todo);
    }
  },
  created: () => {
    console.log('Created');
  },
  mounted: function() {
    fetch('http://eddiecooro.com/todos')
      .then(res => res.json())
      .then(json => {
        this.$data.todos = json;
      });

    const ws = new WebSocket('ws://localhost:2222');
    ws.onmessage = message => this.handleMessage(message);
  },
  updated: () => {
    console.log('Updated');
  }
});

// setInterval(() => {
//   console.log('Here');
//   vm.number += 1;
//   vm.showBox = !vm.showBox;
// }, 3000);
