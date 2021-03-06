import { EventedController } from "ng-harmony/ng-harmony-evented";

export default class Battlecry extends EventedController {
	constructor (...args) {
		super(...args);
		this.$scope.battlecry = "";
		this.settings = {
			key: "battlecry",
			value: this.$scope.battlecry
		};
		this.forceawakened = false;

		this.$scope.$on("forceawakened", () => { this.forceawakened = true; });
	}
	"button.negative::click" () {
		this.$scope.battlecry = "";
		this.LocalStorage.save(this.settings);
		this.$scope.$emit("forceawakens", "afraid");
	}
	"button.positive::click" () {
		this.LocalStorage.save(this.settings);
		if (this.$scope.battlecry.length && this.forceawakened) {
			this.$state.go("game", { battlecry: this.$scope.battlecry });
		} else {
			if (!this.$scope.battlecry.length) {
				$(".ui.nag.slogan").nag("show");
			}
			if (!this.forceawakened) {
				$(".ui.nag.avatar").nag("show");
			}
		}
	}
	".ui.nag i.close.icon::click" () {
		$(".ui.nag").nag("clear");
	}
}
