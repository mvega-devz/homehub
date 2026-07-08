package com.homehub.api.profile;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
class ProfileController {

  private final ProfileService profileService;

  ProfileController(ProfileService profileService) {
    this.profileService = profileService;
  }

  @GetMapping
  ResponseEntity<ProfileResponse> getProfile() {
    return ResponseEntity.ok(ProfileResponse.from(profileService.getProfile()));
  }

  @PutMapping
  ResponseEntity<ProfileResponse> updateProfile(
      @Valid @RequestBody UpdateProfileRequest request) {
    Profile updatedProfile = profileService.updateProfile(request.displayName(), request.email());

    return ResponseEntity.ok(ProfileResponse.from(updatedProfile));
  }
}
