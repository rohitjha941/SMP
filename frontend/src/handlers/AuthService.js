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
  getUser() {
    const user = {
      userAccessToken: this.getAccessToken(),
      userRefreshToken: this.getRefreshToken(),
    };
    return user;
  }
  setAccessToken(token) {
    localStorage.setItem("user_access_token", token);
  }
  setUser(user) {
    localStorage.setItem("user_access_token", user.userAccessToken);
    localStorage.setItem("user_refresh_token", user.userRefreshToken);
  }
  logout() {
    if (this.getAccessToken()) {
      localStorage.removeItem("user_access_token");
      localStorage.removeItem("user_refresh_token");
    }
  }
}
