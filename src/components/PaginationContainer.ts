
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

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
        <button class="btn" id="f" @click=${this.handlePageButtonClick} >First</button>
        <button class="btn" id="p" @click=${this.handlePageButtonClick} >Prev.</button>` 
        : html``}
        
        ${
            html`<p>${this.page}</p>`
        }

        ${this.page !== this.numberOfPages ? html`
            <button class="btn" id="n" @click=${this.handlePageButtonClick} >Next</button>
            <button class="btn" id="l" @click=${this.handlePageButtonClick} >Last</button>` 
            : html``
        }
        `;
    }

    protected updated(): void {
        console.log(this.numberOfPages);
        console.log(this.total);
        
    }
    static styles = [
        css`
            :host {
                display: flex;
                justify-content:space-around;
                align-items:center;
                width:100%;
            }
            button {
            padding: 0.6rem;
            border: none;
            border-radius: 0.4rem;
            background:rgb(5, 201, 116);
            color: white;
            cursor: pointer;
            transition: background 0.4s ease-in-out;
            }

            button:hover {
            background:rgb(80, 174, 133);
            }
        `
    ];

}

declare global {
    interface HTMLElementTagNameMap {
        "pagination-container": PaginationContainer;
    }
}
