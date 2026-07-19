package com.homehub.api.maintenance;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "maintenance_task")
public class MaintenanceTaskEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 255)
  private String title;

  @Column(name = "due_date", nullable = false)
  private LocalDate dueDate;

  @Column(nullable = false, length = 100)
  private String frequency;

  @Column(nullable = false)
  private boolean completed;

  protected MaintenanceTaskEntity() {
  }

  public MaintenanceTaskEntity(String title, LocalDate dueDate, String frequency, boolean completed) {
    this.title = Objects.requireNonNull(title);
    this.dueDate = Objects.requireNonNull(dueDate);
    this.frequency = Objects.requireNonNull(frequency);
    this.completed = completed;
  }

  public Long getId() {
    return id;
  }

  void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public LocalDate getDueDate() {
    return dueDate;
  }

  public String getFrequency() {
    return frequency;
  }

  public boolean isCompleted() {
    return completed;
  }

  public void setTitle(String title) {
    this.title = Objects.requireNonNull(title);
  }

  public void setDueDate(LocalDate dueDate) {
    this.dueDate = Objects.requireNonNull(dueDate);
  }

  public void setFrequency(String frequency) {
    this.frequency = Objects.requireNonNull(frequency);
  }

  public void setCompleted(boolean completed) {
    this.completed = completed;
  }
}
