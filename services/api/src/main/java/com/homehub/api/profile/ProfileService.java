package com.homehub.api.profile;

import java.util.concurrent.atomic.AtomicReference;
import org.springframework.stereotype.Service;

@Service
class ProfileService {

  private static final Profile DEFAULT_PROFILE =
      new Profile("HomeHub User", "user@homehub.local");

  private final AtomicReference<Profile> profile = new AtomicReference<>(DEFAULT_PROFILE);

  Profile getProfile() {
    return profile.get();
  }

  Profile updateProfile(String displayName, String email) {
    return profile.updateAndGet(currentProfile -> currentProfile.update(displayName, email));
  }
}
