import {
  definePlugin,
  ButtonItem,
  DialogButton,
  DropdownItem,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { Fragment, VFC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import * as backend from "./backend"

const levelOptions = [
  { data: 0, label: 'None', value: 'none' },
  { data: 1, label: 'FPS', value: 'fps' },
  { data: 2, label: 'Top Menu', value: 'top' },
  { data: 3, label: 'Basic', value: 'basic' },
  { data: 4, label: 'Full', value: 'full' },
];

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  backend.setServer(serverAPI);
  const [config, setConfig] = useState<string>("not loaded");
  const [level, setLevel] = useState<number>(2);
  backend.resolvePromise(backend.load(level), setConfig);

  const onLoadClick = () => {
    backend.resolvePromise(backend.load(level), setConfig);
  }

  const onSaveClick = () => {
    backend.resolvePromise(backend.save(config), setConfig)
  };

  const handleFormChange = (e) => {
    setConfig(e.target.value)
  };

  return (
    <Fragment>
      <Fragment>
        <DropdownItem
          label="Load Config"
          description='Loads predefined configs'
          menuLabel="Config Style"
          rgOptions={levelOptions.map((o) => ({
            data: o.data,
            label: o.label,
          }))}
          selectedOption={levelOptions.find((o) => o.data === level)?.data || 2}
          onChange={(newLevel: { data: number; label: string }) => {
            setLevel(newLevel.data);
          }}
          />
        <ButtonItem layout="inline" onClick={onLoadClick}>
          {'Load'}
        </ButtonItem>
      </Fragment>
      <Fragment>
        <textarea
          rows={15}
          value={config}
          onChange={handleFormChange}
        />
        <ButtonItem layout="inline" onClick={onSaveClick}>
          {'Save'}
        </ButtonItem>
      </Fragment>
    </Fragment>
  );
};

const MangoEditorRouter: VFC = () => {
  return (
    <div style={{ marginTop: "50px", color: "white" }}>
      Hello World!
      <DialogButton onClick={() => Router.NavigateToLibraryTab()}>
        Go to Library
      </DialogButton>
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.routerHook.addRoute("/mango-editor", MangoEditorRouter, {
    exact: true,
  });

  return {
    title: <div className={staticClasses.Title}>MangoEditor</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaEdit />,
    onDismount() {
      serverApi.routerHook.removeRoute("/mango-editor");
    },
  };
});
