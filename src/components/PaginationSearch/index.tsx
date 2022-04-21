import { MenuSearch } from "./styled";

interface PaginationProps {
  min: number;
  max: number;
  value: number;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onButtonClick(): void;
}

const PaginationSearching: React.FC<PaginationProps> = ({
  min,
  max,
  value,
  onChange,
  onButtonClick,
}) => (
  <MenuSearch className="row justify-content-center pb-4">
    <div className="col col-2">
      <div className="row justify-content-center pb-4">
        <div className="col col-8">
          <div className="input-group flex-nowrap">
            <input
              type="number"
              className="form-control"
              min={min}
              max={max}
              value={value}
              onChange={onChange}
            />
            <button
              className="input-group-text fw-bold"
              id="addon-wrapping"
              onClick={onButtonClick}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  </MenuSearch>
);

export default PaginationSearching;
