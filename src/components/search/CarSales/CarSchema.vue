<template>
	<div v-if="places"></div>
</template>
  
<script>
import { getBusinessHours } from "@/services";
export default {
	name: "CarSalesSchema",
	metaInfo() {
		return {
			script: [
				{
					type: "application/ld+json",
					json: this.jsonld(),
				}
			],
		};
	},
	props: ["StockId"],
	computed: {
		item() {
			return this.$store.getters.vehicleById(this.StockId);
		},
		places() {
			return this.$store.state.getGoogleReviews.googlereviews.result;
		},
	},
	methods: {
		replace(st) {
			const result = st
				.split("")
				.splice(0, 770)
				.join("")
				.replace(/<\/?[^>]+(>|$)/g, "...");
			return result;
		},
		jsonld() {
			const data = {
				"@context": "https://schema.org/",
				"@type": ["Car", "Product"],  // Multi-Type Entities
				"name": this.item?.title,
				"description": this.replace(this.item?.Comments),
				"sku": this.StockId,
				"vehicleIdentificationNumber": this.item?.vin,
				"image": [
					this.item?.thumb || '',
				],
				"brand": {
					"@type": "Car",
					"name": this.item?.make?.displayValue[0],
				},
				"color": this.item?.colour?.displayValue[0],
				"bodyType": this.item?.body?.displayValue[0],
				"driveWheelConfiguration": this.item?.transmission?.displayValue[0],
				"offers": {
					"@type": "Offer",
					"priceCurrency": "AUD",
					"price": this.item?.price,
					"itemCondition": `https://schema.org/${this.item?.condition?.displayValue[0]}Condition`,
					"url": `${this.places?.website + 'vehicle-for-sale/' + this.StockId + '/' + this.item?.year?.value[0] + '-' + this.item?.make?.displayValue[0] + '-' + this.item?.model?.displayValue[0]}`,
					"availability": "InStock",
					"seller": {
            "@type": ["Organization", "Place"],
						"telephone": this.places?.formatted_phone_number,
						"name": this.places?.name,
						"url": this.places?.website,
						"image": this.$store.state.site.logo,
						"address": {
							"@type": "PostalAddress",
							"addressCountry": "Australia",
							"streetAddress": this.places?.address_components[1]?.long_name,
							"postalCode": this.places?.address_components[6]?.long_name,
							"addressLocality": this.places?.address_components[2]?.long_name,
							"addressRegion": this.places?.address_components[4]?.long_name
						},
						// Nested GeoCoordinates
						"geo": {
							"@type": "GeoCoordinates",
							"latitude": this.places?.geometry?.location?.lat,
							"longitude": this.places?.geometry?.location?.lng,
						},
					}
				},
				"fuelType": this.item?.fuel?.displayValue[0],
				"mileageFromOdometer": {
					"@type": "QuantitativeValue",
					"value": this.item?.kms,
					"unitCode": "KMT"
				},
				"modelDate": this.item?.year?.displayValue[0],
				"vehicleModelDate": this.item?.year?.displayValue[0],
				"numberOfDoors": this.item?.doors?.displayValue[0],
				"seatingCapacity": this.item?.seats?.displayValue[0],
				"vehicleSeatingCapacity": this.item?.seats?.displayValue[0],
				"vehicleTransmission": this.item?.transmission?.displayValue[0],
				"vehicleEngine": {
					"@type": "EngineSpecification",
					"name": `${this.item?.engine?.displayValue[0]} Litre Engine`,
				}
			};
			return data;
		},

	},
	mounted() {
		this.$meta().refresh(); // Refresh meta tags, including JSON-LD
	},
	watch: {
		item() {
			this.$meta().refresh();
		},
		places() {
			this.$meta().refresh();
		},
	},
};
</script>
  