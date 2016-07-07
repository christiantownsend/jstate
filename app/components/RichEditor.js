import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios'

import InlineStyleControls from './InlineStyleControls'
import BlockStyleControls from './BlockStyleControls'

const styleMap = {
};

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleBlockType = (style) => this._toggleBlockType(style);
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _toggleBlockType(blockStyle) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockStyle
      )
    );
  }

  componentWillMount() {
    if (this.props.Url != '/create-post'){
      axios.get('/api/get-post/' + this.props.postUrl + '/1').then((data) => {
        this.setState({editorState: EditorState.push(this.state.editorState, convertFromRaw(data.data.content), 'redo')})
      }).catch(error => console.log(error));
    }
  }

  render() {

    return (

    <div className="rich-editor" onFocus={this.focus}>
      {this.props.editing ?
      <div className="controls">
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />
      </div>
      : null }
      <Editor
        onChange={this.onChange}
        editorState={this.state.editorState}
        customStyleMap={styleMap}
        placeholder="Write something..."
        handleKeyCommand={this.handleKeyCommand}
        readOnly={!this.props.editing}
        ref="editor"
      />
    </div>
    )
  }
}

export default RichEditor;
