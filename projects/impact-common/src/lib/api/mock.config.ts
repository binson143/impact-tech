import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
export default {
  GET: {
    'https://localhost:42000/notifications': {
      handler: getNotifications
    },
    'https://localhost:42000/users': {
      handler: getAllUsers
    },
    'https://localhost:42000/userByName': {
      handler: getUserByName
    }
  },
  POST: {
    'https://localhost:42000/login': {
      handler: login
    },
    'https://localhost:42000/register': {
      handler: register
    },
    'https://localhost:42000/sendNotification': {
      handler: sendNotifications
    },
    'https://localhost:42000/updateUser': {
      handler: updateUser
    },
    'https://localhost:42000/deleteMessage': {
      handler: deleteMessage
    }
  }
};
function deleteMessage(body) {
  const notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const allNotifications = JSON.parse(notifications);
    const userNotifications = allNotifications.find(item => item.username === body.username);
    userNotifications.notifications = userNotifications.notifications.filter(item => item.id !== body.id);
    localStorage.removeItem('users-notifications');
    localStorage.setItem('users-notifications', JSON.stringify(allNotifications));
    return of(new HttpResponse({
      status: 200, body: {}
    }));
  }
}
function getUserByName(params) {
  const username = params.get('username');
  const registeredUsers = JSON.parse(localStorage.getItem('registered-users'));
  if (registeredUsers !== null) {
    const user = registeredUsers.find(x => x.username === username);
    return of(new HttpResponse({
      status: 200, body: user
    }));
  }
  return of(new HttpResponse({
    status: 200, body: {}
  }));
}
function updateUser(body) {
  const username = body.username;
  const registeredUsers = JSON.parse(localStorage.getItem('registered-users'));
  const userIndex = registeredUsers.findIndex(x => x.username === username);
  registeredUsers[userIndex] = body;
  localStorage.removeItem('registered-users');
  localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
  return of(new HttpResponse({
    status: 200, body
  }));
}
function getAllUsers() {
  const registeredUsers = localStorage.getItem('registered-users');
  if (registeredUsers !== null) {
    const users = JSON.parse(registeredUsers).map(x => {
      return { username: x.username, email: x.email };
    });
    return of(new HttpResponse({
      status: 200, body: users
    }));
  }
  return of(new HttpResponse({
    status: 200, body: []
  }));
}
function getNotifications(params) {
  const username = params.get('username');
  const notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const userNotifications = JSON.parse(notifications);
    const index = userNotifications.findIndex(x => x.username === username);
    if (index > -1) {
      return of(new HttpResponse({
        status: 200, body: userNotifications[index].notifications
      }));
    }
  }
  return of(new HttpResponse({
    status: 200, body: []
  }));
}
function sendNotifications(params) {
  const notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const userNotifications = JSON.parse(notifications);
    const index = userNotifications.findIndex(x => x.username === params.recipient);
    if (index > -1) {
      userNotifications[index].notifications.push(params.notification);
    } else {
      userNotifications.push({
        username: params.recipient,
        notifications: [params.notification]
      });
    }
    localStorage.setItem('users-notifications', JSON.stringify(userNotifications));
  } else {
    localStorage.setItem('users-notifications', JSON.stringify([{
      username: params.recipient,
      notifications: [params.notification]
    }]));
  }
  return of(new HttpResponse({
    status: 200, body: {
      status: 'SUCCESS',
      message: 'Notification Sent'
    }
  }));
}
function register(body) {
  const registeredUseres = localStorage.getItem('registered-users');
  if (registeredUseres != null) {
    const users = JSON.parse(registeredUseres);
    if (users.findIndex(x => x.username === body.username) === -1) {
      users.push(body);
      localStorage.setItem('registered-users', JSON.stringify(users));
      return of(new HttpResponse({
        status: 200, body:
        {
          status: 'SUCCESS',
          message: 'User Registered Successfully'
        }
      }));
    } else {
      return of(new HttpResponse({
        status: 200, body:
        {
          status: 'FAILED',
          message: 'Username Already Exists'
        }
      }));
    }
  } else {
    localStorage.setItem('registered-users', JSON.stringify([body]));
    return of(new HttpResponse({
      status: 200, body:
      {
        status: 'SUCCESS',
        message: 'User Registered Successfully'
      }
    }));
  }
}
function login(body) {
  let isAuthenticated = false;
  let userDetails: any = {};
  if (localStorage.getItem('registered-users') != null) {
    const users = JSON.parse(localStorage.getItem('registered-users'));
    const index = users.findIndex(x => x.username === body.username && x.password === body.password);
    if (index > -1) {
      isAuthenticated = true;
      userDetails = users[index];
    }
  }
  return of(new HttpResponse({
    status: 200, body:
    {
      authenticated: isAuthenticated,
      userDetails
    }
  }));
}
