package com.homehub.api.maintenance;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

record UpdateMaintenanceTaskRequest(
    @NotBlank(message = "Title is required.")
    @Size(max = 255, message = "Title must be 255 characters or fewer.")
    String title,

    @NotNull(message = "Due date is required.")
    LocalDate dueDate,

    @NotBlank(message = "Frequency is required.")
    @Size(max = 100, message = "Frequency must be 100 characters or fewer.")
    String frequency,

    boolean completed) {
}
