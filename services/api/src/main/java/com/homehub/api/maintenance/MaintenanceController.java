package com.homehub.api.maintenance;

import java.util.List;
import java.util.stream.Collectors;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

  private final MaintenanceService maintenanceService;

  public MaintenanceController(MaintenanceService maintenanceService) {
    this.maintenanceService = maintenanceService;
  }

  @GetMapping
  public ResponseEntity<List<MaintenanceTaskResponse>> listTasks() {
    List<MaintenanceTaskResponse> response = maintenanceService.listTasks().stream()
        .map(MaintenanceTaskResponse::from)
        .collect(Collectors.toList());
    return ResponseEntity.ok(response);
  }

  @PostMapping
  public ResponseEntity<MaintenanceTaskResponse> createTask(
      @Valid @RequestBody CreateMaintenanceTaskRequest request) {
    MaintenanceTaskEntity task = maintenanceService.createTask(
        request.title(), request.dueDate(), request.frequency());
    return ResponseEntity.ok(MaintenanceTaskResponse.from(task));
  }

  @PutMapping("/{id}")
  public ResponseEntity<MaintenanceTaskResponse> updateTask(
      @PathVariable Long id,
      @Valid @RequestBody UpdateMaintenanceTaskRequest request) {
    MaintenanceTaskEntity task = maintenanceService.updateTask(
        id, request.title(), request.dueDate(), request.frequency(), request.completed());
    return ResponseEntity.ok(MaintenanceTaskResponse.from(task));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    maintenanceService.deleteTask(id);
    return ResponseEntity.noContent().build();
  }
}
