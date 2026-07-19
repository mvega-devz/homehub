package com.homehub.api.maintenance;

record MaintenanceTaskResponse(
    Long id,
    String title,
    java.time.LocalDate dueDate,
    String frequency,
    boolean completed) {

  static MaintenanceTaskResponse from(MaintenanceTaskEntity entity) {
    return new MaintenanceTaskResponse(
        entity.getId(),
        entity.getTitle(),
        entity.getDueDate(),
        entity.getFrequency(),
        entity.isCompleted());
  }
}
