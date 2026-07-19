package com.homehub.api.maintenance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintenanceTaskRepository extends JpaRepository<MaintenanceTaskEntity, Long> {
}
