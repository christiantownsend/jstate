import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Editor, EditorState, SelectionState, ContentState, CompositeDecorator, Entity, Modifier, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import axios from 'axios'

import InlineStyleControls from './InlineStyleControls'
import BlockStyleControls from './BlockStyleControls'

import LinkEntity from './LinkEntity'

const styleMap = {
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkEntity
  }
])

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      return character.entity !== null && Entity.get(character.getEntity()).getType() === 'LINK'
    },
    callback
  )
}

class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showUrlInput: true,
      urlValue: 'http://google.com/'
    };

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => this.setState({editorState})

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    this.toggleBlockType = (style) => this._toggleBlockType(style)

    this.onUrlChange = (e) => this.setState({urlValue: e.target.value})
    this.confirmLink = this._confirmLink.bind(this)
    this.logState = () => console.log(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  _confirmLink(e) {
    e.preventDefault()
    const contentState = this.state.editorState.getCurrentContent()
    const targetRange = this.state.editorState.getSelection()
    const key = Entity.create('LINK', 'MUTABLE', {href: "http://zombo.com"})
    const contentStateWithLink = Modifier.applyEntity(
      contentState,
      targetRange,
      key
    )
    this.setState({editorState: EditorState.push(this.state.editorState, contentStateWithLink, 'apply-entity')})
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  _toggleBlockType(blockStyle) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockStyle
      )
    )
  }

  componentWillMount() {
    if (!this.props.creating && this.props.content) {
      this.setState({editorState: EditorState.push(this.state.editorState, convertFromRaw(this.props.content), 'redo')})
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.creating) this.setState({editorState: EditorState.createEmpty(decorator)})
  }

  renderControls() {
    return (
      <div className="controls">
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />

        <input type="text" value={this.props.urlValue} onChange={this.onUrlChange}></input>
        <button onClick={this.confirmLink}>Add Link</button>
        <button onClick={this.logState}>Log State</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="rich-editor" onFocus={this.focus}>
          {this.props.editing ? this.renderControls() : null }
          <Editor
            onChange={this.onChange}
            editorState={this.state.editorState}
            customStyleMap={styleMap}
            placeholder={this.props.editing ? "Write something..." : null}
            handleKeyCommand={this.handleKeyCommand}
            readOnly={!this.props.editing}
            ref="editor"
          />
        </div>
      </div>
    )
  }
}

export default RichEditor;
