
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"
import './CustomButton'
@customElement("pagination-container")
export class PaginationContainer extends LitElement {

    @property({ attribute: true }) total : number = 0;
    @state() page = 1;

    private itemsPerPage = 20;
    private get numberOfPages(): number {
        return Math.ceil(this.total / this.itemsPerPage);
    }

    private handlePageButtonClick(event: Event) {
        const account = event.target as HTMLButtonElement;
        this.changePageValues(account.id);
        this.dispatchEvent(new CustomEvent("page-change", {
            detail: {
                limit : this.itemsPerPage,
                skip: this.itemsPerPage*(this.page-1),
                page: this.page,
            },
            bubbles: true,
            composed: true,
        }))
    }

    private changePageValues(accountId: string) {
        switch(accountId) {
            case "f":
                this.page =1;
                break;
            case "n":
                this.page<this.numberOfPages ? this.page++ : this.page;
                break;
            case "p":
                this.page > 0 ? this.page-- : this.page;;
                break;
            case "l":
                this.page = this.numberOfPages;
                break;
            default:
                this.page = 1;
        }
    }
    render() {
        return html`
        ${this.page !==1 ? html`
        <custom-button class="btn" id="f" @click=${this.handlePageButtonClick} >First</custom-button>
        <custom-button class="btn" id="p" @click=${this.handlePageButtonClick} >Prev.</custom-button>` 
        : html``}
        
        ${
            html`<p>${this.page}</p>`
        }

        ${this.page !== this.numberOfPages ? html`
            <custom-button class="btn" id="n" @click=${this.handlePageButtonClick} >Next</custom-button>
            <custom-button class="btn" id="l" @click=${this.handlePageButtonClick} >Last</custom-button>` 
            : html``
        }
        `;
    }

    static styles = [
        css`
            :host {
                display: flex;
                justify-content:space-around;
                align-items:center;
                width:100%;
            }

        `
    ];

}

declare global {
    interface HTMLElementTagNameMap {
        "pagination-container": PaginationContainer;
    }
}
