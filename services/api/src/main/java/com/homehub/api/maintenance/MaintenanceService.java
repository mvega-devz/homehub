package com.homehub.api.maintenance;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceService {

  private final MaintenanceTaskRepository repository;
  private final List<MaintenanceTaskEntity> standaloneTasks = new CopyOnWriteArrayList<>();
  private final AtomicLong standaloneId = new AtomicLong();

  public MaintenanceService(ObjectProvider<MaintenanceTaskRepository> repositoryProvider) {
    this.repository = repositoryProvider.getIfAvailable();
  }

  public List<MaintenanceTaskEntity> listTasks() {
    return repository == null ? List.copyOf(standaloneTasks) : repository.findAll();
  }

  public MaintenanceTaskEntity createTask(String title, LocalDate dueDate, String frequency) {
    MaintenanceTaskEntity task = new MaintenanceTaskEntity(title, dueDate, frequency, false);
    if (repository == null) {
      task.setId(standaloneId.incrementAndGet());
      standaloneTasks.add(task);
      return task;
    }
    return repository.save(task);
  }

  public MaintenanceTaskEntity updateTask(Long id, String title, LocalDate dueDate, String frequency, boolean completed) {
    MaintenanceTaskEntity task = repository == null
        ? standaloneTasks.stream().filter(candidate -> candidate.getId().equals(id)).findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Task not found: " + id))
        : repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found: " + id));
    task.setTitle(title);
    task.setDueDate(dueDate);
    task.setFrequency(frequency);
    task.setCompleted(completed);
    return repository == null ? task : repository.save(task);
  }

  public void deleteTask(Long id) {
    if (repository == null) {
      standaloneTasks.removeIf(task -> task.getId().equals(id));
    } else {
      repository.deleteById(id);
    }
  }
}
