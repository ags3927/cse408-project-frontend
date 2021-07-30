<template>
	<div class="container">
		<b-progress
			variant="warning"
			:value="getProgressBarWidth"
			style="border-radius: 20px; height: 12px"
			class="bg-light shadow mt-4">

		</b-progress>

		<div class="card shadow my-card-border mt-3 mx-auto" style="width: 60%">

			<div id="step-01" v-if="step===1" class="text-left">
				<h5 class="my-4 ml-4 pl-3" style="font-size: 20px">What kind of place are you listing?</h5>
				<h6 class="ml-5 text-secondary">First, choose a property type.</h6>

				<div class="row">
					<div class="col-12 mx-auto">
						<b-select
							class="mx-auto shadow"
							style="width: 85%; height: 40px; border-radius: 10px; font-size: 16px"
							v-model="propertyObject.typeOfProperty"
							:options="propertyTypes">
						</b-select>
					</div>
				</div>

				<h6 class="ml-5 mt-4 text-secondary">What will guests have?</h6>

				<b-form-radio
					class="text-left ml-5 mb-3"
					style="font-size: 15px"
					name="some-radios"
					v-model="propertyObject.guestAccess"
					value="Entire Place">
					Entire Place
				</b-form-radio>
				<b-form-radio
					class="text-left ml-5"
					style="font-size: 15px"
					name="some-radios"
					v-model="propertyObject.guestAccess"
					value="Private Place">
					Private Place
				</b-form-radio>
			</div>

			<div id="step-02" v-if="step===2" class="text-left">

				<h5 class="my-4 mx-4 px-3" style="font-size: 20px">How many guests can your place accommodate?</h5>
				<h6 class="mx-4 px-3 text-secondary">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<div class="row mx-4 px-3 mt-3">
					<div class="col-4 mr-auto text-left">
						<h6
							class="text-secondary"
							style="line-height: 40px;">
							Adults
						</h6>
					</div>
					<div class="col-4 mr-auto">
						<b-form-spinbutton
							v-model="propertyObject.accommodationCapacity.adults"
							min="0"
							max="10"
						></b-form-spinbutton>
					</div>
				</div>

				<div class="row mx-4 px-3 ">
					<div class="col-4 mr-auto text-left">
						<h6
							class="text-secondary"
							style="line-height: 40px;">
							Children
						</h6>
					</div>
					<div class="col-4 mr-auto">
						<b-form-spinbutton
							v-model="propertyObject.accommodationCapacity.children"
							min="0"
							max="10"
						></b-form-spinbutton>
					</div>
				</div>

				<div class="row mx-4 px-3">
					<div class="col-4 mr-auto text-left">
						<h6
							class="text-secondary"
							style="line-height: 40px;">
							Infants
						</h6>
					</div>
					<div class="col-4 mr-auto">
						<b-form-spinbutton
							v-model="propertyObject.accommodationCapacity.infants"
							min="0"
							max="10"
						></b-form-spinbutton>
					</div>
				</div>


				<h6 class="mt-4 mx-4 px-3">How many beds can guest use?</h6>

				<div class="row mx-4 px-3 mt-3">
					<div class="col-4 mr-auto text-left">
						<h6
							class="text-secondary"
							style="line-height: 40px;">
							Bedrooms
						</h6>
					</div>
					<div class="col-4 mr-auto">
						<b-form-spinbutton
							v-model="propertyObject.accommodationServices.bedroom.count"
							min="0"
							max="10"
						></b-form-spinbutton>
					</div>
				</div>
				<div class="row mx-4 px-3">
					<div class="col-4 mr-auto text-left">
						<h6
							class="text-secondary"
							style="line-height: 40px;">
							Beds
						</h6>
					</div>
					<div class="col-4 mr-auto">
						<b-form-spinbutton
							v-model="propertyObject.accommodationServices.bedroom.bedCount"
							min="0"
							max="10"
						></b-form-spinbutton>
					</div>
				</div>

			</div>

			<div id="step-03" v-if="step===3" class="text-left">

				<h5 class="my-4 mx-4 px-3" style="font-size: 20px">How many bathrooms?</h5>
				<h6 class="mx-4 px-3 text-secondary">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<div class="row mx-4 px-3 mt-3">
					<div class="col-4 mr-auto text-left">
						<h6
							class="text-secondary"
							style="line-height: 40px;">
							Bathrooms
						</h6>
					</div>
					<div class="col-4 mr-auto">
						<b-form-spinbutton
							v-model="propertyObject.accommodationServices.bathroom.count"
							min="0"
							max="10"
						></b-form-spinbutton>
					</div>
				</div>


				<h6 class="ml-5 mt-4">Is the bathroom private?</h6>

				<b-form-radio
					type="boolean"
					class="text-left ml-5 mb-3"
					style="font-size: 15px"
					name="some-radios"
					v-model="propertyObject.accommodationServices.bathroom.isPrivate"
					value="true">
					Yes
				</b-form-radio>
				<b-form-radio
					type="boolean"
					class="text-left ml-5"
					style="font-size: 15px"
					name="some-radios"
					v-model="propertyObject.accommodationServices.bathroom.isPrivate"
					value="false">
					No
				</b-form-radio>

			</div>

			<div id="step-04" v-if="step===4" class="text-left mx-4 px-3">

				<h5 class="my-4" style="font-size: 20px">Where's your place located?</h5>
				<h6 class="text-secondary">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>


				<h6 class="mt-4 custom-padding-location text-secondary">Street Address</h6>

				<b-form-input
					class="elux-selector"
					placeholder="Street Address"
					v-model="propertyObject.location.streetAddress">
				</b-form-input>

				<h6 class="mt-4 custom-padding-location text-secondary">Apt, suite</h6>

				<b-form-input
					class="elux-selector"
					placeholder="Apt, suite access code"
					v-model="propertyObject.location.aptSuite">
				</b-form-input>

				<div class="row px-3">
					<div class="col-12 col-lg-6 mx-auto text-left pr-lg-2">
						<h6 class="mt-4 custom-padding-location text-secondary">Area</h6>

						<b-form-input
							class="elux-selector"
							placeholder="City"
							v-model="propertyObject.location.area">
						</b-form-input>

					</div>

					<div class="col-12 col-lg-6 mx-auto text-left pl-lg-2">
						<h6 class="mt-4 custom-padding-location text-secondary">City</h6>

						<b-form-input
							class="elux-selector"
							placeholder="City"
							v-model="propertyObject.location.city">
						</b-form-input>

					</div>
				</div>

				<h6 class="mt-4 custom-padding-location text-secondary">Zip Code</h6>

				<b-form-input
					class="elux-selector"
					placeholder="Zip Code"
					v-model="propertyObject.location.zipCode">
				</b-form-input>


			</div>

			<div id="step-05" v-if="step===5" class="text-left mx-4 px-3">

				<h5 class="my-4" style="font-size: 20px">Is the pin in the right place?</h5>
				<h6 class="text-secondary mb-3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<button
					@click="fetchLocation"
					class="btn btn-warning text-white shadow my-3"
					style="border-radius: 10px; line-height: 30px">
					<fa-icon :icon="['fas', 'map-marker-alt']" class="mr-2"></fa-icon>
					<span class="font-weight-bold">Use Current Location</span>
				</button>

				<div class="row">
					<div class="col-10 pl-1">
						<b-form-input
							class="mb-4"
							:class="{' border-0': mapAddressDisabled, 'bg-white': mapAddressDisabled }"
							v-model="mapAddress"
							:disabled="mapAddressDisabled">
						</b-form-input>
					</div>
					<div class="col-2 text-right">
						<button class="btn" @click="editMapAddress">
							{{ mapAddressEditText }}
						</button>
					</div>
				</div>

				<gmap-map
					:center="propertyObject.location.coordinates"
					:zoom="12"
					style="width:100%; height: 400px;">
					<gmap-marker
						:draggable="true"
						@dragend="updateMarker($event)"
						:position="propertyObject.location.coordinates">
					</gmap-marker>
				</gmap-map>
			</div>

			<div id="step-06" v-if="step===6" class="text-left mx-4 px-3">

				<h5 class="my-4" style="font-size: 20px">What amenities do you offer?</h5>
				<h6 class="text-secondary mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<div class="row">
					<div class="col-6 text-left px-3 mb-3" :key="amenity+index" v-for="(amenity, index) in basicAmenities">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.accommodationServices.amenities"
							:key="amenity"
							:value="amenity">
							{{ amenity }}
						</b-form-checkbox>
					</div>
				</div>

				<h6 class="my-4">Safety Amenities</h6>
				<div class="row">
					<div class="col-6 text-left px-3 mb-3" :key="amenity+index" v-for="(amenity, index) in safetyAmenities">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.accommodationServices.amenities"
							:key="amenity"
							:value="amenity">
							{{ amenity }}
						</b-form-checkbox>
					</div>
				</div>

			</div>

			<div id="step-07" v-if="step===7" class="text-left mx-4 px-3">

				<h5 class="my-4" style="font-size: 20px">What spcaes can guests use?</h5>
				<h6 class="text-secondary mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<div class="row">
					<div class="col-6 text-left px-3 mb-3" :key="amenity+index" v-for="(amenity, index) in accessibleSpaces">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.accommodationServices.guestAccessibleSpaces"
							:key="amenity"
							:value="amenity">
							{{ amenity }}
						</b-form-checkbox>
					</div>
				</div>


			</div>

			<div id="step-08" v-if="step===8" class="text-left mx-4 px-3">

				<h5 class="my-4" style="font-size: 20px">Add photos to your listing.</h5>
				<h6 class="text-secondary mb-4">Lorem ipsum dolor sit amset, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>


				<div class="bg-white mx-auto px-3 my-listing-image-bg">
					<div class="row"
						 v-if="!imageUploaded">
						<div class="col-12 mx-auto">
							<img
								class="mx-auto w-100 h-100 p-3"
								:src="imageUploadBG" alt="Background Photo"
								style="border-radius: 20px">
						</div>
					</div>


					<div class="row"
						 v-if="imageUploaded">
						<div class="col-12 col-lg-6" :key="image"
							 v-for="(image, index) in propertyObject.imagesOfProperty">

							<button class="btn elux-image-remove-button"
									@click="removeImage(index)">
								<span style="font-size: 15px;">X</span>
							</button>
							<img
								class="mx-auto w-100 h-100 p-3"
								:src="image" alt="Background Photo"
								style="border-radius: 30px">
						</div>
					</div>
				</div>

				<b-form-file
					class="mt-3"
					v-model="uploadedImage"
					accept="image/jpeg, image/png"
					placeholder="Choose an image or drop it here..."
					drop-placeholder="Drop image here...">
				</b-form-file>

				<div class="row">
					<div class="col-12 mx-auto">
						<b-button @click="uploadImage"
								  :disabled="!uploadedImage"
								  class="btn btn-warning py-2 mt-3 my-listing-next-button shadow">
							Upload Image
						</b-button>
					</div>
				</div>


			</div>

			<div id="step-09" v-if="step===9" class="text-left mx-4 px-3">

				<h5 class="mt-5 mb-3" style="font-size: 20px">Describe your property to guests</h5>
				<h6 class="text-secondary mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<div class="row">
					<div class="col-12 px-3">
						<textarea
							type="text"
							class="h6 elux-custom-shadow border-0 w-100 pl-3 pt-2"
							maxlength="500"
							style="border-radius: 10px; padding-right: 4rem;"
							rows="15"
							v-model="propertyObject.description"
							:state="getDescriptionValidity">
						</textarea>

						<p class="text-secondary"
						   style="position:absolute; bottom: 0; right: 7%; font-size: 15px">
							{{ getRemainingDescriptionLetters }}
						</p>
					</div>
				</div>

				<h5 class="mt-5 mb-3" style="font-size: 20px">Create title for your listing</h5>
				<h6 class="text-secondary mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<div class="row">
					<div class="col-12 px-3">
						<input
							type="text"
							class="h6 elux-custom-shadow border-0 w-100 pl-3"
							maxlength="50"
							style="border-radius: 10px; padding-right: 4rem; height: 40px; line-height: 40px"
							v-model="propertyObject.title"
							:state="getTitleValidity">
						<p class="text-secondary"
						   style="position:absolute; top: 20%; right: 7%; font-size: 15px">
							{{ getRemainingTitleLetters }}
						</p>
					</div>
				</div>

			</div>

			<div id="step-10" v-if="step===10" class="text-left mx-4 px-3">

				<h5 class="mt-5 mb-3" style="font-size: 20px">Review guest requirements</h5>
				<h6 class="text-secondary mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<h6 class="mt-4 mb-3 font-weight-bold">All guests must provide:</h6>

				<div class="row">
					<div class="col-12 text-left px-3 mb-3" :key="requirement+index" v-for="(requirement, index) in guestRequirements.mandatory">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.guestRequirements.mandatory"
							:key="requirement"
							:value="requirement">
							{{ requirement }}
						</b-form-checkbox>
					</div>
				</div>

				<h6 class="mt-4 mb-3 font-weight-bold">Before booking your property must:</h6>

				<div class="row">
					<div class="col-12 text-left px-3 mb-3" :key="requirement+index" v-for="(requirement, index) in guestRequirements.beforeBooking">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.guestRequirements.beforeBooking"
							:key="requirement"
							:value="requirement">
							{{ requirement }}
						</b-form-checkbox>
					</div>
				</div>

				<h6 class="mt-4 mb-3 font-weight-bold">Add additional requirements:</h6>

				<div class="row">
					<div class="col-12 text-left px-3 mb-3" :key="requirement+index" v-for="(requirement, index) in guestRequirements.additional">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.guestRequirements.additional"
							:key="requirement"
							:value="requirement">
							{{ requirement }}
						</b-form-checkbox>
					</div>
				</div>

			</div>

			<div id="step-11" v-if="step===11" class="text-left mx-4 px-3">

				<h5 class="mt-5 mb-3" style="font-size: 20px">Set rules for your guests</h5>
				<h6 class="text-secondary mb-4">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.</h6>

				<div class="row">
					<div class="col-12 text-left px-3 mb-3" :key="rule+index" v-for="(rule, index) in rulesForGuests">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.rulesForGuests"
							:key="rule"
							:value="rule">
							{{ rule }}
						</b-form-checkbox>
					</div>
				</div>

				<h6 class="mt-4 mb-3">Details guests must know</h6>

				<div class="row">
					<div class="col-6 text-left pl-3 mb-3" :key="detail+index" v-for="(detail, index) in detailsForGuests">
						<b-form-checkbox
							class="text-left"
							style="font-size: 16px; color: rgba(0,0,0,0.6);"
							v-model="propertyObject.detailsForGuests"
							:key="detail"
							:value="detail">
							{{ detail }}
						</b-form-checkbox>
					</div>
				</div>

			</div>

			<div id="step-12" v-if="step===12" class="text-left mx-4 px-3">

				<h5 class="mt-5 mb-3" style="font-size: 20px">Two questions to get started with your settings</h5>

				<h6 class="text-secondary mt-4 mb-3 custom-padding-location">Have you rented out your place before?</h6>

				<b-form-radio
					class="text-left mb-2 ml-3"
					style="font-size: 15px"
					name="some-radios"
					v-model="propertyObject.rentedBefore"
					:value="true">
					Yes
				</b-form-radio>
				<b-form-radio
					class="text-left ml-3"
					style="font-size: 15px"
					name="some-radios"
					v-model="propertyObject.rentedBefore"
					:value="false">
					No
				</b-form-radio>

				<h6 class="text-secondary mt-4 mb-3 custom-padding-location">How often do you want to have guests?</h6>

				<b-form-input
					class="border-0 elux-custom-shadow"
					style="border-radius: 10px"
					v-model="propertyObject.reservationFrequency">
				</b-form-input>


			</div>

			<div id="step-13" v-if="step===13" class="text-left mx-4 px-3">

				<h5 class="mt-5 mb-3" style="font-size: 20px">What are the minimum and maximum stay times?</h5>

				<div class="row mt-3">
					<div class="col-12 col-lg-6 text-left px-3 pl-lg-3">
						<h6 class="text-secondary"
							style="line-height: 30px">
							Minimum Stay (in days)
						</h6>
					</div>
					<div class="col-12 col-lg-6 text-left px-3 pr-lg-3">
						<b-form-spinbutton
							v-model="propertyObject.stayTimeInNights.min"
							size="sm"
							:state="getMinStayValidity"
							placeholder="--"
							lass="mb-2">
						</b-form-spinbutton>
					</div>
				</div>

				<div class="row mt-2">
					<div class="col-12 col-lg-6 text-left px-3 pl-lg-3">
						<h6 class="text-secondary"
							style="line-height: 30px">
							Maximum Stay (in days)
						</h6>
					</div>
					<div class="col-12 col-lg-6 text-left px-3 pr-lg-3">
						<b-form-spinbutton
							v-model="propertyObject.stayTimeInNights.max"
							size="sm"
							:state="getMaxStayValidity"
							placeholder="--"
							lass="mb-2">
						</b-form-spinbutton>
					</div>
				</div>

				<h6 class="mt-3" style="opacity: 40%">
					Tip: Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
					tincidunt ut laoreet dolore magna aliquam erat
				</h6>
			</div>

			<div id="step-14" v-if="step===14" class="text-left mx-4 px-3">

				<h5 class="mt-5 mb-3" style="font-size: 20px">Price Your Space</h5>
				<h6 class="text-secondary mb-4" style="opacity: 60%">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.
				</h6>

				<h6 class="mt-4 mb-3 custom-padding-location text-secondary">Base Price</h6>

				<div class="row">
					<div class="col-12 px-3">
						<b-form-input
							type="number"
							class="border-0 elux-custom-shadow text-secondary"
							style="border-radius: 10px; padding-left: 2.2rem"
							placeholder="0"
							v-model="propertyObject.price.basePrice">
						</b-form-input>
						<h6 class="text-secondary" style="position: absolute; top: 23%; left: 5%">$</h6>
					</div>
				</div>

				<div class="row">
					<div class="col-8 text-left mt-5 pl-3">
						<h6>Add Discount Prices</h6>
					</div>
					<div class="col-4 text-right mt-5 pr-3">
						<toggle-button
							color="#ffc107"
							v-model="enableDiscount"/>
					</div>
				</div>

				<div class="text-left" v-if="enableDiscount">
					<h6 class="mt-4 mb-3 custom-padding-location text-secondary">Discount Percentage</h6>

					<div class="row">
						<div class="col-12 px-3">
							<b-form-input
								type="number"
								class="border-0 elux-custom-shadow text-secondary"
								style="border-radius: 10px; padding-left: 2.2rem"
								placeholder="0"
								v-model="propertyObject.price.discountPercentage">
							</b-form-input>
							<h6 class="text-secondary" style="position: absolute; top: 23%; left: 5%">%</h6>
						</div>
					</div>

					<h6 class="mt-4 mb-3 custom-padding-location text-secondary">Discount Duration (in days)</h6>

					<div class="row">
						<div class="col-12 px-3">
							<b-form-input
								type="number"
								class="border-0 elux-custom-shadow text-secondary"
								style="border-radius: 10px;"
								placeholder="0"
								v-model="propertyObject.price.discountDuration">
							</b-form-input>
						</div>
					</div>
				</div>

			</div>

			<div id="step-15" v-if="step===15" class="text-left mx-4 px-3">

				<h5 class="mt-5 mb-3" style="font-size: 20px">Your local laws and taxes</h5>

				<h6 class="my-4 font-weight-light">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
					tincidunt ut laoreet dolore magna aliquam erat Lorem ipsum dolor sit amet, consectetuer adipiscing
					elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
				</h6>

				<h6 class="my-4 font-weight-light">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
					tincidunt ut laoreet dolore magna aliquam erat Lorem ipsum dolor sit amet, consectetuer adipiscing
					elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
				</h6>

				<h6 class="my-4 font-weight-light">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
					tincidunt ut laoreet dolore magna aliquam erat Lorem ipsum dolor sit amet, consectetuer adipiscing
					elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
				</h6>

				<h6 class="my-4 font-weight-light">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
					tincidunt ut laoreet dolore magna aliquam erat Lorem ipsum dolor sit amet, consectetuer adipiscing
					elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
				</h6>

				<b-form-checkbox class="text-left ml-3 custom-padding-location" v-model="tnc">
					<h6 class="font-weight-light" style="line-height: 25px">I understand and accept terms &
						conditions</h6>
				</b-form-checkbox>

			</div>


			<div class="row mb-5 mt-4">
				<div class="col-4 text-center ml-auto">
					<button
						@click="back"
						class="btn py-2 mt-3 my-listing-back-button shadow">
						Back
					</button>
				</div>
				<div class="col-4 text-center mr-auto">
					<button
						v-if="step<15"
						@click="next"
						class="btn btn-warning py-2 mt-3 my-listing-next-button shadow">
						Next
					</button>
				</div>
				<div class="col-12 text-center mx-auto">
                    <button
                        @click="finish"
                        class="btn btn-primary py-2 mt-3 my-listing-next-button shadow">
                        Finish
                    </button>
				</div>

			</div>

		</div>

	</div>
</template>

<script>
import axios from 'axios';

import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faMapMarkerAlt);


export default {
	name: "EditListing",
	data() {
		return {
			step: 1,
			propertyTypes: [
				{value: null, text: 'Property Type', disabled: true},
				'Select Property',
				'Banquet Hall',
				'House',
				'Condo',
				'Apartment',
				'Villa',
				'Cottage',
				'Cabin',
				'Venue'
			],
			propertyObject: {
				title: "",
				description: "",
				location: {
					coordinates: {
						lng: 0,
						lat: 0
					},
					country: "",
					state: "",
					city: "",
					zipCode: "",
					aptSuite: "",
					streetAddress: "",
				},
				guestAccess: "",
				typeOfProperty: "",
				rentedBefore: false,
				reservationFrequency: "",
				accommodationCapacity: {
					adults: 0,
					children: 0,
					infants: 0
				},
				accommodationServices: {
					bedroom: {
						count: 0,
						bedCount: 0
					},
					bathroom: {
						count: 0,
						isPrivate: true
					},
					amenities: [],
					guestAccessibleSpaces: []
				},
				rating: {
					value: "double",
					timesRated: "int"
				},
				price: {
					basePrice: 0,
					discountPercentage: 0,
					discountDuration: 0
				},
				stayTimeInNights: {
					min: 0,
					max: 0
				},
				arrivalNoticeInDays: 0,
				checkInTime: {
					from: "",
					to: ""
				},
				rulesForGuests: [],
				detailsForGuests: [],
				guestRequirements: {
					mandatory: [],
					beforeBooking: [],
					additional: []
				},
				imagesOfProperty: [],
				reservations: []
			},
			coordsFetched: false,
			mapAddress: "",
			mapAddressDisabled: true,
			mapAddressEditText: 'Edit',
			basicAmenities: [
				'Workspace',
				'Wifi',
				'Parking',
				'Heat',
				'Air Conditioning',
				'Iron',
				'Shampoo',
				'Hair Dryer',
				'Dryer',
				'Breakfast',
				'Fireplace',
				'Closet',
				'Private Entrance'
			],
			safetyAmenities: [
				'Smoke Detector',
				'Carbon Monoxide Detector',
				'First Aid Kit',
				'Fire Extinguisher'
			],
			accessibleSpaces: [
				'Private Living Room',
				'Parking',
				'Kitchen',
				'Gym',
				'Laundry-Washer',
				'Pool',
				'Laundry-Dryer'
			],
			imageUploaded: false,
			imageUploadBG: 'https://res.cloudinary.com/ags3927/image/upload/v1597994122/e-lux/Mask_Group_2_qwoh1t.png',
			uploadedImage: null,
			guestRequirements: {
				mandatory: [
					'Email address',
					'Confirmed phone number'
				],
				beforeBooking: [
					'Agree to your rules ',
					'Message you about their trip',
					'Let you know how many guests are coming',
					'Confirm their check-in-time if they\'re arriving within 2 days'
				],
				additional: [
					'Government-issued ID submitted to us',
					'Recommended by other hosts and have no negative reviews'
				]
			},
			rulesForGuests: [
				'Suitable for Children & Infants',
				'Suitable for Pets',
				"Smoking Allowed",
				'Events or parties allowed'
			],
			detailsForGuests: [
				"Must Climb Stairs",
				"Amenity Limitations",
				"Potential for Noise",
				"Surveillance or Recording Devices",
				"Pets Live on Property",
				"Weapons on Property",
				"No Parking on Property",
			],
			arrivalNoticeOptions: [
				{value: 1, text: '1 day'},
				{value: 2, text: '2 days'},
				{value: 3, text: '3 days'},
				{value: 4, text: '4 days'},
				{value: 5, text: '5 days'},
				{value: 6, text: '6 days'},
				{value: 7, text: '7 days'},
				{value: 8, text: '8 days'},
				{value: 9, text: '9 days'},
				{value: 10, text: '10 days'}
			],
			enableDiscount: false,
			tnc: true,
			step6Warning: false,
			step7Warning: false,
			step10Warning: false,
			step11Warning: false
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL',
			'getListingToEdit',
			'getListingToEditID'
		]),
		getMinStayValidity() {
			if (this.propertyObject.stayTimeInNights.min <= this.propertyObject.stayTimeInNights.max) return null;
			return false;
		},
		getMaxStayValidity() {
			if (this.propertyObject.stayTimeInNights.max >= this.propertyObject.stayTimeInNights.max) return null;
			return false;
		},
		getProgressBarWidth() {
			return this.step * (100.0 / 15.0);
		},
		getDescriptionValidity() {
			if (this.propertyObject.description.length > 500) return false;
			return null;
		},
		getRemainingDescriptionLetters() {
			return 500 - this.propertyObject.description.length;
		},
		getTitleValidity() {
			if (this.propertyObject.title.length > 50) return false;
			return null;
		},
		getRemainingTitleLetters() {
			return 50 - this.propertyObject.title.length;
		}
	},
	methods: {
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		editMapAddress() {
			if (this.mapAddressDisabled) this.mapAddressDisabled = false;
			else {
				this.mapAddressDisabled = true;
				axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.mapAddress}&key=USE_YOUR_API_KEY`)
					.then(res => {
						this.propertyObject.location.coordinates = res.data.results[0].geometry.location;
					})
					.catch(err => {
						// console.log(err);
					});
			}
			if (this.mapAddressEditText === 'Edit') this.mapAddressEditText = 'Done';
			else this.mapAddressEditText = 'Edit';
		},
		addressToCoordinates() {

		},
		updateMarker(position) {
			this.propertyObject.location.coordinates.lat = position.latLng.lat();
			this.propertyObject.location.coordinates.lng = position.latLng.lng();
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.propertyObject.location.coordinates.lat},${this.propertyObject.location.coordinates.lng}&key=USE_YOUR_API_KEY`)
				.then(res => {
					this.mapAddress = res.data.results[0].formatted_address;
				})
				.catch(err => {
					// console.log(err);
				})
			this.coordsFetched = true;
		},
		validateStep() {
			if (this.step === 1) {
				if (this.propertyObject.typeOfProperty === '' || this.propertyObject.guestAccess === '') {
					this.makeToast('danger', 'Error', 'Please fill up the details before proceeding further');
					return false;
				}
				return true;
			} else if (this.step === 2) {
				if (this.propertyObject.accommodationCapacity.adults === 0) {
					this.makeToast('danger', 'Error', 'Please enter number of guests before proceeding further');
					return false;
				} else if (this.propertyObject.accommodationServices.bedroom.bedCount === 0 ||
					this.propertyObject.accommodationServices.bedroom.count === 0) {
					this.makeToast('danger', 'Error', 'Please enter number of beds and/or bedrooms before proceeding further');
					return false;
				}
				return true;
			} else if (this.step === 3) {
				if (this.propertyObject.accommodationServices.bathroom.count === 0) {
					this.makeToast('danger', 'Error', 'Please enter number of bathrooms before proceeding further');
					return false;
				}
				return true;
			} else if (this.step === 4) {
				if (this.propertyObject.location.area === '' ||
					this.propertyObject.location.streetAddress === '' ||
					this.propertyObject.location.city === '' ||
					this.propertyObject.location.zipCode === '') {
					this.makeToast('danger', 'Error', 'Please enter all location details before proceeding further');
					return false;
				}
				return true;
			} else if (this.step === 6) {
				if (this.propertyObject.accommodationServices.amenities.length === 0 && !this.step6Warning) {
					this.makeToast('warning', 'Warning', 'Are you sure you want to proceed without adding any amenities?');
					this.step6Warning = true;
					return false;
				}
				return true;
			} else if (this.step === 7) {
				if (this.propertyObject.accommodationServices.guestAccessibleSpaces.length === 0 && !this.step7Warning) {
					this.makeToast('warning', 'Warning', 'Are you sure you want to proceed without adding any accessible spaces?');
					this.step7Warning = true;
					return false;
				}
				return true;
			} else if (this.step === 8) {
				if (this.propertyObject.imagesOfProperty.length === 0) {
					this.makeToast('danger', 'Error', 'You need to add an image before proceeding further');
					return false;
				}
				return true;
			} else if (this.step === 9) {
				if (this.propertyObject.description.length === 0 || this.propertyObject.title.length === 0) {
					this.makeToast('danger', 'Error', 'You need to add a title and description before proceeding further');
					return false;
				} else if (this.propertyObject.description.length > 500) {
					this.makeToast('danger', 'Error', 'Description exceeds character limit');
					return false;
				} else if (this.propertyObject.title.length > 50) {
					this.makeToast('danger', 'Error', 'Title exceeds character limit');
					return false;
				}
				return true;
			} else if (this.step === 10) {
				if (!this.step10Warning &&
					this.propertyObject.guestRequirements.mandatory.length === 0 &&
					this.propertyObject.guestRequirements.beforeBooking.length === 0 &&
					this.propertyObject.guestRequirements.additional.length === 0) {
					this.makeToast('warning', 'Warning', 'Are you sure you want to proceed without adding any requirements?');
					this.step10Warning = true;
					return false;
				}
				return true;
			} else if (this.step === 11) {
				if (!this.step11Warning &&
					(this.propertyObject.rulesForGuests.length === 0 || this.propertyObject.detailsForGuests.length === 0)) {
					this.makeToast('warning', 'Warning', 'Are you sure you want to proceed without adding any rules for guests?');
					this.step11Warning = true;
					return false;
				}
				return true;
			} else if (this.step === 13) {
				if (this.propertyObject.stayTimeInNights.min === 0 ||
					this.propertyObject.stayTimeInNights.max === 0 ||
					this.propertyObject.stayTimeInNights.min > this.propertyObject.stayTimeInNights.max) {
					this.makeToast('danger', 'Error', 'You need to enter valid information before proceeding further');
					return false;
				}
				return true;
			} else if (this.step === 14) {
				if (this.propertyObject.price.basePrice <= 0) {
					this.makeToast('danger', 'Error', 'You need to enter a valid base price before proceeding further');
					return false;
				} else if (this.propertyObject.price.discountPercentage < 0 ||
					this.propertyObject.price.discountPercentage >= 100 ||
					this.propertyObject.price.discountDuration < 0) {
					this.makeToast('danger', 'Error', 'You need to enter valid discount information before proceeding further');
					return false;
				}
				return true;
			}
			return true;
		},
		back() {
			if (this.step === 1) {
				this.$router.push('/listings');
			}
			this.step = Math.max(this.step - 1, 1);
		},
		next() {
			if (!this.validateStep()) return;
			if (this.step === 4 && !this.coordsFetched) {
				let address = this.propertyObject.location.streetAddress + ", " + this.propertyObject.location.area + ", "
					+ this.propertyObject.location.city;
				axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=USE_YOUR_API_KEY`)
					.then(res => {
						this.propertyObject.location.coordinates = res.data.results[0].geometry.location;
					})
					.catch(err => {
						// console.log(err);
					});
				this.mapAddress = address;
			}
			this.step = Math.min(this.step + 1, 17)
		},
		fetchLocation() {
			axios.get('https://api.ipdata.co/?api-key=USE_YOUR_API_KEY')
				.then(res => {
					// console.log(res.data);
					this.propertyObject.location.coordinates.lat = res.data.latitude;
					this.propertyObject.location.coordinates.lng = res.data.longitude;
					axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${res.data.latitude},${res.data.longitude}&key=USE_YOUR_API_KEY`)
						.then(res => {
							this.mapAddress = res.data.results[0].formatted_address;
							this.coordsFetched = true;
						})
						.catch(err => {
							this.makeToast('danger', 'Error', 'Location services unavailable');
							// console.log(err.response);
						});
				})
				.catch(err => {
					console.log(err);
					this.$getLocation({
						enableHighAccuracy: true,
						timeout: 10
					}).then(coordinates => {
						this.propertyObject.location.coordinates.lat = coordinates.lat;
						this.propertyObject.location.coordinates.lng = coordinates.lng;
						axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=USE_YOUR_API_KEY`)
							.then(res => {
								this.mapAddress = res.data.results[0].formatted_address;
								this.coordsFetched = true;
							})
							.catch(err => {
								this.makeToast('danger', 'Error', 'Location services unavailable');
								// console.log(err.response);
							});
					});
				});
		},
		removeImage(idx) {
			this.propertyObject.imagesOfProperty.splice(idx, 1);
			if (this.propertyObject.imagesOfProperty.length === 0) this.imageUploaded = false;
		},
		uploadImage() {
			this.imageUploaded = true;
			let fd = new FormData();
			fd.append('upload_preset', 'USE_YOUR_UPLOAD_PRESET');
			fd.append('folder', 'USE_YOUR_FOLDER');
			fd.append('file', this.uploadedImage);
			this.uploadedImage = null;
			axios.post('https://api.cloudinary.com/v1_1/USE_YOUR_USERNAME/upload', fd)
				.then(res => {
					this.responseData = res.data;
					this.propertyObject.imagesOfProperty.push(res.data.secure_url);
				})
				.catch(err => {
					// console.log(err);
				});
		},
		finish() {
			if (!this.tnc) {
				this.makeToast('danger', 'Error', 'You need to accept terms and conditions before proceeding further');
				return;
			}
			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;

			// console.log(this.propertyObject);

			axios.post(baseURL + 'property/update', {
				propertyID: this.propertyObject._id,
				propertyObject: this.propertyObject
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				// console.log(res);
				this.makeToast('success', 'Success', 'Property has been updated successfully');
				setTimeout(()=> {
					this.$router.push('/listings');
				}, 3000);
			}).catch(err => {
				this.makeToast('danger', 'Error', 'There was an error. Please try again.');
				// console.log(err);
			});
		},
		parseAmenities(tempProperty) {
			for (let j = 0; j < tempProperty.accommodationServices.amenities.length; j++) {
				tempProperty.accommodationServices.amenities[j] = JSON.parse(tempProperty.accommodationServices.amenities[j]).name;
			}
			for (let j = 0; j < tempProperty.rulesForGuests.length; j++) {
				tempProperty.rulesForGuests[j] = JSON.parse(tempProperty.rulesForGuests[j]).name;
			}
			this.propertyObject = tempProperty;
			// console.log(this.propertyObject);
		},
	},
	mounted() {

		let baseURL = this.getServerBaseURL;

		axios.post(baseURL + 'property/viewbyid', {
			propertyID: this.$route.query.id
		}).then(res => {
			let tempProperty = res.data.property;
			this.parseAmenities(tempProperty);
			if (this.propertyObject.imagesOfProperty.length > 0) this.imageUploaded = true;
		}).catch(err => {
			// console.log(err);
		});

	}

}
</script>

<style scoped>

input:active, input:focus, textarea:focus, textarea:active {
	border: none;
	outline: none;
}

.br-10 {
	border-radius: 10px;
}

.elux-image-remove-button {
	position: absolute;
	top: 7%;
	right: 7%;
	border: none;
	border-radius: 20px;
	background-color: rgba(0, 0, 0, 0.2);
	color: white;
}


.custom-padding-location {
	padding-left: 0.75rem;
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.my-listing-image-bg {
	width: 100%;
	height: fit-content;
	border: 1px dashed rgba(0, 0, 0, 0.3);
	border-radius: 20px;
}

.my-listing-back-button {
	border-radius: 12px;
	background-color: #F3F3F3;
	border: none;
	color: black;
	width: 150px;
}

.my-listing-back-button:hover {
	border-radius: 12px;
	background-color: #D0D0D0;
	border: none;
	color: black;
	width: 150px;
}

.my-listing-next-button {
	border-radius: 12px;
	border: none;
	color: white;
	width: 150px;
}
</style>
