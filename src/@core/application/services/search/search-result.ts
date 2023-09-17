import Entity from "../../../shared/domain/entities/entity";
import EntityProps from "../../../shared/domain/entities/entity-props";

type SearchResultProps<P extends EntityProps, E extends Entity<P>, Filter> = {
    items: E[];
    total: number;
    current_page: number;
    per_page: number;
    sort: string | null;
    sort_dir: string | null;
    filter: Filter | null;
  };
  
  export class SearchResult< P extends EntityProps, E extends Entity<P> = Entity<P>, Filter = string> {
    readonly items: E[];
    readonly total: number;
    readonly current_page: number;
    readonly per_page: number;
    readonly last_page: number;
    readonly sort: string | null;
    readonly sort_dir: string | null;
    readonly filter: Filter;
  
    constructor(props: SearchResultProps<P, E, Filter>) {
      this.items = props.items;
      this.total = props.total;
      this.current_page = props.current_page;
      this.per_page = props.per_page;
      this.last_page = Math.ceil(this.total / this.per_page);
      this.sort = props.sort;
      this.sort_dir = props.sort_dir;
      this.filter = props.filter;
    }
  
    toJSON(forceEntity = false) {
      return {
        items: forceEntity ? this.items.map((item) => item.toJson()) : this.items,
        total: this.total,
        current_page: this.current_page,
        per_page: this.per_page,
        last_page: this.last_page,
        sort: this.sort,
        sort_dir: this.sort_dir,
        filter: this.filter as any,
      };
    }
  }