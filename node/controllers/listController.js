const listModel = require("../models/listModel");
const userModel = require("../models/userModel");
const sgelModel = require("../models/seglModel");
const notificationModel = require("../models/notificationModel");

const mongoose = require("mongoose");

const getAllLists = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 8;
    const skip = (page - 1) * limit;
    let lists = await listModel
      .find({ visibility: "العامة " })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(201).json({
      message: "Successfully fetched all the lists",
      data: lists,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllListsUserView = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 8;
    const skip = (page - 1) * limit;
    let lists = await listModel
      .find({ isAccepted: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(201).json({
      message: "Successfully fetched all the lists",
      data: lists,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteList = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const data = await listModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json("Id Not Found");
    }
    const user = await userModel.findById(userId);
    if (user.role !== "owner") {
      const sgelData = await sgelModel.create({
        type: `delete list data post`,
        user: user,
        data: data,
      });
    }
    res.status(200).json("list Deleted Successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getSingleList = async (req, res) => {
  try {
    const { id } = req.params;
    const singleMassacres = await listModel.findById(id).populate("user");
    res.json(singleMassacres);
  } catch (error) {
    res.status(400).json({ error: "Error in Fetching Data" });
  }
};
const searchByCategory = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const { category } = req.query;
    const found = await listModel
      .find({
        category: category,
        isAccepted: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user");
    res.json(found);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    const found = await listModel
      .find({ name: { $regex: name, $options: "i" }, isAccepted: true })
      .sort({ createdAt: -1 })
      .populate("user");
    res.json(found);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchByCategoryFalse = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const { category } = req.query;
    const found = await listModel
      .find({
        category: category,
        isAccepted: false,
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user");
    res.json(found);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateList = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { name, content, governorate, externalLinks } = req.body;
    const imageDescriptions = req.body.imageDescriptions ? JSON.parse(req.body.imageDescriptions) : [];

    let updateData = {};

    // تحديث الصور والوصف
    if (req.files && req.files['images']) {
      updateData.images = req.files['images'].map((file, index) => ({
        imgPath: file.filename,
        description: imageDescriptions[index] || "", 
      }));
    }

    // تحديث الفيديو
    if (req.files && req.files['video']) {
      updateData.video = req.files['video'][0].filename;
    }

    // تحديث الحقول النصية
    if (name) updateData.name = name;
    if (content) updateData.content = content;
    if (governorate) updateData.governorate = governorate;
    if (externalLinks) updateData.externalLinks = externalLinks;

    const updatedList = await listModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedList) {
      return res.status(404).json("No list with this Id found.");
    }

    const user = await userModel.findById(userId);

    if (user.role !== "owner") {
      await sgelModel.create({
        type: "update list data post",
        user: user,
        data: updatedList,
      });
    }

    res.status(200).json({ data: updatedList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addNewList = async (req, res) => {
  try {
    const { userId } = req.params;
    let files = req.files;
    let documents = [];
    let images = [];
       // Handle images and descriptions
       if (files["images"]) {
        // Check if imageDescriptions is an array or a single string
        const descriptions = Array.isArray(req.body.imageDescriptions)
          ? req.body.imageDescriptions
          : [req.body.imageDescriptions];
  
        images = files["images"].map((file, index) => ({
          imgPath: file.filename,
          description: descriptions[index] || "",
        }));
      }

    const video = files["video"] ? files["video"][0].filename : null;

    const {
      externalLinks,
      content,
      governorate,
      name,
      category,
      isAccepted,
      visibility,
    } = req.body;
    const user = await userModel.findById(userId);

    const addNewList = await listModel.create({
      externalLinks,
      content,
      governorate,
      name,
      category,
      isAccepted:
        user.role === "admin" ||
        user.role === "supervisor" ||
        user.role === "owner",
      images,
      video,
      documents,
      visibility,
      user: userId,
    });

    if (!addNewList) {
      return res.status(400).json({ error: "Failed to add the list" });
    }

    const updateData = await userModel
      .findByIdAndUpdate(
        userId,
        { lists: [...user.lists, addNewList] },
        { new: true }
      )
      .populate("lists");
    if (user.role !== "owner") {
      if (user.role !== "owner") {
        const sgelData = await sgelModel.create({
          type: `add list data post`,
          user: user,
          data: addNewList,
        });
      }
      if (addNewList.isAccepted == true) {
        const notificationData = await notificationModel.create({
          type: `add list data post`,
          user: user,
          data: addNewList,
        });
      }
      res.status(200).json(addNewList);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptDataList = async (req, res) => {
  try {
    const { listId, userId } = req.params;

    const acceptedList = await listModel.findByIdAndUpdate(
      listId,
      {
        isAccepted: true,
        notification: "تم قبول منشورك بنجاح",
      },
      { new: true }
    );

    if (!acceptedList) {
      return res.status(400).json({ error: "Failed to update the data" });
    }
    const user = await userModel.findById(userId);
    if (user.role !== "owner") {
      const sgelData = await sgelModel.create({
        type: `accept list data post`,
        user: user,
        data: acceptedList,
      });
    }
    const notificationData = await notificationModel.create({
      type: `add list data post`,
      user: user,
      data: acceptedList,
    });
    res
      .status(200)
      .json({ success: "data updated successfully", data: acceptedList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get lists for all
const getListsForAll = async (req, res) => {
  try {
    const lists = await listModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user");

    res.status(200).json({ data: lists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get lists for me

const getListsForMe = async (req, res) => {
  try {
    const id = req.id;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const lists = await listModel.find({ visibility: "خاص بي", user: id });

    res.status(200).json({ data: lists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const list = await listModel.findById(id);

    if (!list) {
      return res.status(404).json({ error: "No list found with this ID" });
    }

    const newVisibility = list.visibility === "خاص بي" ? "العامة" : "خاص بي";

    list.visibility = newVisibility;
    await list.save();

    res
      .status(200)
      .json({
        message: "Visibility updated successfully",
        visibility: list.visibility,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVisibility = async (req, res) => {
  try {
    const { postId } = req.params;
    const { visibility } = req.body;

    const updatedPost = await listModel.findByIdAndUpdate(
      postId,
      { visibility },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Visibility updated successfully", data: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//save data and only admin or superviser can see it (in dashboard)
const getDashboardData = async (req, res) => {
  try {
    const { role } = req;

    if (role !== "admin" && role !== "supervisor") {
      return res.status(403).json({ error: "Access denied" });
    }

    const data = await listModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user");

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveList = async (req, res) => {
  try {
    const { userId, listId } = req.body;
    console.log(userId)
    console.log(listId)

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(listId)) {
      return res.status(400).json({ message: 'Invalid userId or listId.' });
    }

    const user = await userModel.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can save lists.' });
    }


    const list = await listModel.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found.' });
    }
    console.log('List details:', list);

    if (!user.saveLists.includes(list._id)) {
      user.saveLists.push(list._id);
      await user.save();
    }
list.isAccepted = true;
await list.save();
    res.status(200).json({ message: 'List saved successfully.' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const addNewPost = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }
    let files = req.files;
    let documents = [];
    let images = [];
    
    // Handle images and descriptions
    if (files["images"]) {
      const descriptions = Array.isArray(req.body.imageDescriptions)
        ? req.body.imageDescriptions
        : [req.body.imageDescriptions];

      images = files["images"].map((file, index) => ({
        imgPath: file.filename,
        description: descriptions[index] || "",
      }));
    }

    const video = files["video"] ? files["video"][0].filename : null;

    const {
      externalLinks,
      content,
      governorate,
      name,
      category,
      isAccepted,
      visibility,
    } = req.body;
    const user = await userModel.findById(userId);
    console.log(user)
    const newPost = await listModel.create({
      externalLinks,
      content,
      governorate,
      name,
      category,
      isAccepted: user.role === "admin" || user.role === "supervisor" || user.role === "owner",
      images,
      video,
      documents,
      visibility,
      user: userId,
    });

    if (!newPost) {
      return res.status(400).json({ error: "Failed to add the post" });
    }
    console.log(user.role)
    if (user.role === "admin" || user.role==="user"|| user.role==="owner"|| user.role==="supervisor") {
      await userModel.findByIdAndUpdate(
        userId,
        { $push: { saveLists: newPost._id } },
        { new: true }
      );
    }

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const publishPost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const user = await userModel.findById(userId);

    if (user.role !== "admin") {
      return res.status(403).json({ error: "You do not have permission to publish posts" });
    }

    // Check if the post is in saveLists
    const postInSaveLists = user.saveLists.includes(postId);
    if (!postInSaveLists) {
      return res.status(404).json({ error: "Post not found in saveLists" });
    }

    // Remove post from saveLists and add it to lists
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { 
        $pull: { saveLists: postId },
        $push: { lists: postId }
      },
      { new: true }
    );

    const updatedPost = await listModel.findByIdAndUpdate(
      postId,
      { isAccepted: true },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllLists,
  deleteList,
  getSingleList,
  searchByCategory,
  updateList,
  addNewList,
  acceptDataList,
  getAllListsUserView,
  searchByCategoryFalse,
  searchByName,
  getListsForAll,
  getListsForMe,
  toggleVisibility,
  updateVisibility,
  getDashboardData,
  saveList,
  addNewPost,
  publishPost
};
