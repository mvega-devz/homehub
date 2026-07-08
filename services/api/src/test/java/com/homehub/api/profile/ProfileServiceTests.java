package com.homehub.api.profile;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class ProfileServiceTests {

  @Test
  void returnsDefaultProfile() {
    ProfileService profileService = new ProfileService();

    Profile profile = profileService.getProfile();

    assertThat(profile.displayName()).isEqualTo("HomeHub User");
    assertThat(profile.email()).isEqualTo("user@homehub.local");
  }

  @Test
  void updatesProfile() {
    ProfileService profileService = new ProfileService();

    Profile updatedProfile = profileService.updateProfile("Miguel Vega", "miguel@example.com");

    assertThat(updatedProfile.displayName()).isEqualTo("Miguel Vega");
    assertThat(updatedProfile.email()).isEqualTo("miguel@example.com");
    assertThat(profileService.getProfile()).isSameAs(updatedProfile);
  }
}
