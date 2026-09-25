import { User } from "../models/user.model.js";

// ======================================  ADDRESSES CONTROLLERS  =================================

export async function addAddress(req, res) {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const user = req.user;

    if (!fullName || !streetAddress || !city || !state || !zipCode) {
      return res.status(400).json({ error: "Missing required address field" });
    }

    // If an account is set to default it should reset the previous default address to false
    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });

    await user.save();
    res.status(201).json({
      message: "Address Added Successfully",
      addresses: user.addAddresses,
    });
  } catch (error) {
    console.log("Error from addAddresses controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAddress(req, res) {
  try {
    const user = req.user;
    req.status(200).json({ addresses: user.addAddress });
  } catch (error) {
    console.log("Error from getAddresses controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateAddress(req, res) {
  try {
    const {
      list,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const { addressId } = req.params;

    const address = user.address.id(addressId);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // If an account is set to default it should reset the previous default address to false

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save();
    res.status(200).json({
      message: "Address Updated Successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Error from updateAddresses controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteAddress(req, res) {
  try {
    const { addressId } = req.params;
    const user = req.user;
    user.addresses.pull(adddressId);

    await user.save();
    res.status(200).json({
      message: "Address Deleted Successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Error from deleteAddresses controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//  ===================================   WISHLIST CONTROLLERS  =====================================

export async function addToWishlist(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    // Check if the product is already in the  wishList
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ error: "Product already in the wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();
    res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.log("Error from addToWishlist Controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getWishlist(req, res) {
  try {
    const user = req.user;
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.log("Error from getWishlist Controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const { productId } = req.params;
    const user = req.user;

    if (!user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ error: "Product is not found in the wishlist" });
    }

    user.wishlist.pull(productId);
    await user.save();

    res.status(200).josn({ message: "Product removed from wishlist" });
  } catch (error) {
    console.log("Error from removeFromWishlist Controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
