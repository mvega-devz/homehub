package com.homehub.api.profile;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

record UpdateProfileRequest(
    @NotBlank(message = "Display name is required.")
    @Size(max = 80, message = "Display name must be 80 characters or fewer.")
    String displayName,

    @NotBlank(message = "Email is required.")
    @Email(message = "Email must be valid.")
    @Size(max = 254, message = "Email must be 254 characters or fewer.")
    String email) {
}
