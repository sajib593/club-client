দারুণ কাজ এগিয়েছে already ❤️ এখন ধাপে ধাপে তোমার backend-এর /memberShip API টা ঠিক করে দেই।

তোমার চাহিদা গুলো আবার সাজাই:

ClubDetails থেকে POST request যাবে /memberShip এ ✅

Backend:

users collection থেকে user খুঁজবে (email দিয়ে) ✅

user-এর _id নিবে এবং memberShip collection এ save করবে ✅

যদি membershipFee === 0 হয় ⇒ সরাসরি ক্লাবে যোগ (active status) ✅

যদি membershipFee > 0 হয় ⇒ payment process এ যাবে (pending_payment status) ✅

এর আগে user ওই club-এর member কিনা check করবে ⇒ আগে member হলে আবার যোগ হতে পারবে না ✅

এখন সরাসরি কোড দিচ্ছি 👇

✅ Backend: /memberShip API Complete Code
// membership related api-------------------------- 

app.post('/memberShip', async (req, res) => {
    try {
        const { userEmail, userName, clubId, membershipFee, joinedAt, expireAt } = req.body;

        // basic validation
        if (!userEmail || !clubId) {
            return res.status(400).send({ message: "userEmail and clubId are required" });
        }

        // 1️⃣ user collection থেকে user বের করব
        const user = await usersCollection.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // 2️⃣ আগে এই user এই club-এর member কিনা check করব
        const existingMembership = await memberShipCollection.findOne({
            userId: user._id,
            clubId: new ObjectId(clubId)
        });

        if (existingMembership) {
            return res.status(409).send({
                message: "User is already a member of this club",
                alreadyMember: true
            });
        }

        // 3️⃣ membershipFee number এ convert
        const fee = Number(membershipFee) || 0;

        // 4️⃣ স্ট্যাটাস ঠিক করব fee অনুযায়ী
        //   - fee === 0  -> active
        //   - fee > 0    -> pending_payment
        let status = fee === 0 ? "active" : "pending_payment";

        // 5️⃣ memberShip document তৈরি
        const membershipDoc = {
            userId: user._id,                  // user collection এর _id
            userEmail,
            userName,
            clubId: new ObjectId(clubId),
            membershipFee: fee,
            joinedAt: joinedAt ? new Date(joinedAt) : new Date(),
            expireAt: expireAt ? new Date(expireAt) : null,
            status,
            createdAt: new Date()
        };

        // 6️⃣ DB তে insert
        const result = await memberShipCollection.insertOne(membershipDoc);

        // 7️⃣ Response পাঠাব
        return res.send({
            insertedId: result.insertedId,
            status,
            requiresPayment: fee > 0, // true হলে payment এ redirect করতে পারবে
            message:
                fee === 0
                    ? "Membership created successfully without payment"
                    : "Membership created. Payment is required to activate."
        });

    } catch (error) {
        console.error("Error creating membership:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

🔍 এখানে কি হচ্ছে?
1️⃣ User find করা
const user = await usersCollection.findOne({ email: userEmail });


→ এর _id আমরা userId হিসেবে membership এ রাখছি।

2️⃣ আগে member কিনা চেক
const existingMembership = await memberShipCollection.findOne({
    userId: user._id,
    clubId: new ObjectId(clubId)
});


→ একি user + একই club থাকলে আবার insert না করে:

return res.status(409).send({ message: "User is already a member of this club" });

3️⃣ Status logic
const fee = Number(membershipFee) || 0;
let status = fee === 0 ? "active" : "pending_payment";


Free club ⇒ status: "active"

Paid club ⇒ status: "pending_payment" (payment successful হলেই আরেকটা route থেকে update করবে)

পরের ধাপে তুমি চাইলে এভাবে আরেকটা route বানাতে পারো payment success এ:

app.patch('/memberShip/:id/pay', async (req, res) => {
    const id = req.params.id;
    const result = await memberShipCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "active", paidAt: new Date() } }
    );
    res.send(result);
});

🔁 Frontend side ছোট একটা improve (optional but ভালো)

তোমার frontend already এইভাবে check করছে:

const res = await axiosInstance.post("/memberShip", memberShipData);
if (res.data.insertedId) {
   Swal.fire({ ...success... });
}


কিন্তু এখন backend থেকে আমরা extra data পাঠাচ্ছি যেমন alreadyMember, requiresPayment ইত্যাদি। তুমি চাইলে এগুলা handle করতে পারো:

try {
    const res = await axiosInstance.post("/memberShip", memberShipData);

    if (res.data.alreadyMember) {
        return Swal.fire({
            icon: "warning",
            title: "Already a member",
            text: "You are already a member of this club."
        });
    }

    if (res.data.insertedId && !res.data.requiresPayment) {
        return Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Joined club successfully!",
            showConfirmButton: false,
            timer: 2000
        });
    }

    if (res.data.insertedId && res.data.requiresPayment) {
        // এখানে তুমি payment page এ navigate করতে পারো
        // navigate(`/payment/${res.data.insertedId}`);
        return Swal.fire({
            icon: "info",
            title: "Payment required",
            text: "Please complete payment to activate your membership."
        });
    }

} catch (error) {
    console.log(error);
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Unsuccessful",
        showConfirmButton: false,
        timer: 2000
    });
}
