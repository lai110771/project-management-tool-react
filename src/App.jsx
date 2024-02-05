import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState(preState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: preState.selectedProjectId,
        id: taskId
      };
      return {
        ...preState,
        tasks: [newTask, ...preState.tasks]
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((preState) => {
      return {
        ...preState,
        tasks: preState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState(preState => {
      return {
        ...preState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(preState => {
      return {
        ...preState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState(preState => {
      return {
        ...preState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(preState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };
      return {
        ...preState,
        selectedProjectId: undefined,
        projects: [...preState.projects, newProject]
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((preState) => {
      return {
        ...preState,
        selectedProjectId: undefined,
        projects: preState.projects.filter((project) => project.id !== preState.selectedProjectId)
      };
    });
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }


  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject} projects={projectsState.projects}
        onSelectProjet={handleSelectProject} selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
