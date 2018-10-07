import React, {Component} from 'react';
import SvgIcon from 'components/Helpers/SvgIcon';

class EditModeButtons extends Component{
  render(){
    const { onSave, onCancel, editMode } = this.props

    if ( !editMode ){
      return null
    }

    return(
      <div className="e-card__edit-buttons">
        <div className="ui-buttons-group">
          <button
            onClick={onSave}
            className="btn btn-primary btn--iconed">
            <SvgIcon name="checkmark" />
            <span>Сохранить</span>
          </button>
          <button
            onClick={onCancel}
            className="btn btn-outline">
            Отменить
          </button>
        </div>
      </div>
    )
  }
}

export default EditModeButtons
