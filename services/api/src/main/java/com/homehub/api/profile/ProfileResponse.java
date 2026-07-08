package com.homehub.api.profile;

record ProfileResponse(String displayName, String email) {

  static ProfileResponse from(Profile profile) {
    return new ProfileResponse(profile.displayName(), profile.email());
  }
}
