export type MaintenanceTask = {
  id: number;
  title: string;
  dueDate: string;
  frequency: string;
  completed: boolean;
};

const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function getMaintenanceTasks(): Promise<MaintenanceTask[]> {
  const response = await fetch(`${API_BASE}/api/maintenance`);
  if (!response.ok) {
    throw new Error("Failed to load maintenance tasks");
  }
  return response.json();
}

export async function createMaintenanceTask(task: {
  title: string;
  dueDate: string;
  frequency: string;
}): Promise<MaintenanceTask> {
  const response = await fetch(`${API_BASE}/api/maintenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create maintenance task");
  }

  return response.json();
}

export async function updateMaintenanceTask(task: MaintenanceTask): Promise<MaintenanceTask> {
  const response = await fetch(`${API_BASE}/api/maintenance/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update maintenance task");
  }

  return response.json();
}

export async function deleteMaintenanceTask(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/api/maintenance/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete maintenance task");
  }
}
