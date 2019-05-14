import React, { Component } from 'react';
import { addProject, setProjects, addPalette, setPalettes } from '../actions';
import { connect } from 'react-redux';
import { handleFetch } from '../thunks/handleFetch';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './PaletteForm.css';
import cogoToast from 'cogo-toast';

export class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      paletteName: '',
      projectName: '',
      newProject: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.addProject()
    this.addPalette()
  }
  
  addProject = async () => {
    const { projectName } = this.state;
    const url = process.env.REACT_APP_BACKEND_URL + 'api/v1/projects/'
    const optionsObject = {
      method: 'POST',
      body: JSON.stringify({name: projectName}),
      headers: { 
        'Content-Type': 'application/json'
      }
    }
    await this.props.handleFetch(url, addProject, optionsObject);
    await this.props.handleFetch(url, setProjects);
    cogoToast.success('Project was added.', {position: 'bottom-left'});
  }
  
  addPalette = async (projectId) => {
    const { paletteName } = this.state
    const { projects, colors } = this.props
    const id = projectId || projects[projects.length -1].id
    const url = process.env.REACT_APP_BACKEND_URL + `api/v1/projects/${id}/palettes/`
    const allPalettesUrl = process.env.REACT_APP_BACKEND_URL + `api/v1/palettes/`    
    const optionsObject = {
      method: 'POST',
      body: JSON.stringify({
        palette_name: paletteName,
        color_1: colors.color1.color,
        color_2: colors.color2.color,
        color_3: colors.color3.color,
        color_4: colors.color4.color,
        color_5: colors.color5.color
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await this.props.handleFetch(url, addPalette, optionsObject)
    this.props.savePalette(false);
    this.props.handleFetch(allPalettesUrl, setPalettes);
    cogoToast.success('Palette was added.', {position: 'bottom-left'});
  }

  showProjects = () => {
    const { projects } = this.props;
    return projects.map(project => {
      return <Dropdown.Item onClick={() => {this.addPalette(project.id)}} key={project.id}>{project.name}</Dropdown.Item>
    })
  }

  newProject = () => {
    this.setState({ newProject: true })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Save Palette</h2>
        <input 
          placeholder='Name this palette'
          name='paletteName'
          className='name-input'
          value={this.state.paletteName}
          onChange={this.handleChange}
        />
        <DropdownButton id="dropdown-basic-button" title="Saved Projects">
          <Dropdown.Item className="dropdown-item" onClick={this.newProject}>Add new project</Dropdown.Item>
          <div className="dropdown-divider"></div>
          {this.showProjects()}
        </DropdownButton>
        { this.state.newProject &&
          <input 
            placeholder='Name this project' 
            name='projectName'
            value={this.state.projectName}
            onChange={this.handleChange}
          />
        }
        <button type='submit'>Save palette & project</button>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  projects: state.projects
})

export const mapDispatchToProps = (dispatch) => ({
  handleFetch: (url, action, options) => dispatch(handleFetch(url, action, options))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaletteForm)
