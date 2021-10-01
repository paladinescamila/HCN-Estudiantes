import { OverlayTrigger, Button, Image, Popover, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../helpers";
import { GetHelpsCheck } from "./HelpsCheck";
import { useSelector } from "react-redux";

export function OpenPropover({ id, name, description }) {
  const { aids } = useSelector((state) => state.activity);
  const aidsF = GetHelpsCheck({ id: id, type: "text", aids: aids });

  const aidsList = (
    <div>
      {Object.values(aidsF).map((aidDescription, _index) => {
        return <li key={_index}> {aidDescription} </li>;
      })}
    </div>
  );
  return description !== "" && Object.values(aidsF).length === 0 ? (
    <Tooltip id="tool-tip-info">{description}</Tooltip>
  ) : (
    <Popover id="popover-basic">
      <Popover.Title as="h3">
        {description !== "" ? (
          <OverlayTrigger placement="right" overlay={<Tooltip id="tool-tip-info">{description}</Tooltip>} transition={false}>
            {({ ref, ...triggerHandler }) => (
              <Button variant="none" id="buttonTooltips" {...triggerHandler} className="d-inline-flex align-items-center">
                <strong>{name}</strong>
                <hr />
                <Image ref={ref} roundedCircle src={toAbsoluteUrl("/media/icons/info-tooltip-green.png")} />
              </Button>
            )}
          </OverlayTrigger>
        ) : (
          <strong>{name}</strong>
        )}
      </Popover.Title>
      <Popover.Content>{aidsList}</Popover.Content>
    </Popover>
  );
}
