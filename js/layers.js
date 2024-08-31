addLayer("e", {
    name: "energize", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffff00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "energy", // Name of prestige currency
    baseResource: "velocity", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for energy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    buyables: {
        11: {
            title() { return "Accelerator" },
            cost(x) { return new Decimal(1).mul(x.pow(1.2)) },
            display() { return "Increases your base Velocity gain by 1. Cost:" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                this.layer.resource = this.layer.resource.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    }
})
