import React from "react";

export default class AuthService extends React.Component {
  hasAccessToken() {
    const token = this.getAccessToken();
    return !!token;
  }
  hasRefreshToken() {
    const token = this.getRefreshToken();
    return !!token;
  }
  getAccessToken() {
    return localStorage.getItem("user_access_token");
  }
  getRefreshToken() {
    return localStorage.getItem("user_refresh_token");
  }
  getUserId() {
    return localStorage.getItem("user_id");
  }
  getUsername() {
    return localStorage.getItem("user_name");
  }
  getUser() {
    const user = {
      user_id: this.getUserId(),
      user_name: this.getUsername(),
      user_access_token: this.getAccessToken(),
      user_refresh_token: this.getRefreshToken(),
    };
    return user;
  }
  setAccessToken(token) {
    localStorage.setItem("user_access_token", token);
  }
  setUser(user) {
    localStorage.setItem("user_id", user.user_id);
    localStorage.setItem("user_name", user.username);
    localStorage.setItem("user_access_token", user.access_token);
    localStorage.setItem("user_refresh_token", user.refresh_token);
  }
  logout() {
    if (this.getAccessToken()) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_access_token");
      localStorage.removeItem("user_refresh_token");
    }
  }
}
