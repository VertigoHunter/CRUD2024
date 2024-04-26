import React, { useState, useCallback } from 'react';

const useEditModeToggle = () => {
  const [editMode, setEditMode] = useState(false);
  const toggle = useCallback(() => {
    setEditMode(!editMode)
  }, [editMode])
  return [editMode, toggle];
}

export default useEditModeToggle;