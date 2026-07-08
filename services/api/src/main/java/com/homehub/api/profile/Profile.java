package com.homehub.api.profile;

import java.util.Objects;

final class Profile {

  private final String displayName;
  private final String email;

  Profile(String displayName, String email) {
    this.displayName = Objects.requireNonNull(displayName);
    this.email = Objects.requireNonNull(email);
  }

  String displayName() {
    return displayName;
  }

  String email() {
    return email;
  }

  Profile update(String displayName, String email) {
    return new Profile(displayName, email);
  }
}
