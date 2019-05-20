import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ModalContainer, Modal, UserInput, ButtonContainer,
} from './styles';

const InputModal = ({ onSubmit, onCancel }) => {
  const [repoInput, setRepoInput] = useState('');

  return (
    <ModalContainer>
      <Modal>
        <h1>Add New User</h1>
        <form onSubmit={e => onSubmit(e, repoInput)}>
          <UserInput
            type="text"
            placeholder="Github User"
            onChange={e => setRepoInput(e.target.value)}
          />
          <ButtonContainer>
            <button className="button__cancel" onClick={() => onCancel()} type="button">
              Cancel
            </button>
            <button className="button__save" type="submit">
              Save
            </button>
          </ButtonContainer>
        </form>
      </Modal>
    </ModalContainer>
  );
};

InputModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default InputModal;
